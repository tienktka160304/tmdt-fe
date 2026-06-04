import { Form, useNavigate } from "react-router-dom";
import Card from "../../component/shared/Card";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFetch } from "../../hook/useFeach";
import { getToken, getUser } from "../../util/auth";
import { cartAction } from "../../store";
import Swal from "sweetalert2";
import { checkToken } from "../../api/user";
import { fetchPayment, postCart, postOrder } from "../../api/order";
import BtnLoadingSubmit from "../../component/shared/BtnLoadingSubmit";

export default function CheckOut() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userGet = getUser();
  const Token = getToken();
  const isCart = useSelector((state) => state.cart);

  useEffect(() => {
    async function kt() {
      const { valid } = await checkToken();
      if (!valid) {
        navigate("/");
      }
    }
    if (!Token) {
      navigate("/");
      return;
    } else {
      kt();
    }
  }, [Token]);

  const { isFetching, fetchedData } = useFetch(fetchPayment, []);
  const [productListState, setProductListState] = useState([]);
  const [loading, setLoading] = useState(false);
  const cartIds = useMemo(() => isCart.map((item) => item.id), [isCart]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const getaddress = userGet?.address?.split(",") || [];
  const [addrDetail, wardGet, districtGet, provinceGet] = getaddress?.map((a) =>
    a.trim(),
  );

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [addressDetail, setAddressDetail] = useState(addrDetail || "");
  const [wardValue, setWardValue] = useState(wardGet || "");
  const [phoneState, setPhoneState] = useState(userGet.phone || "");

  const [shippingFee, setShippingFee] = useState(30000);

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=3")
      .then((res) => res.json())
      .then((data) => setProvinces(data));
  }, []);

  useEffect(() => {
    if (provinceGet && provinces.length > 0) {
      setSelectedProvince(provinceGet);
      const province = provinces.find((p) => p.name === provinceGet);
      if (province) {
        setDistricts(province.districts || []);
        const selectedDist = province.districts.find(
          (d) => d.name === districtGet,
        );
        if (selectedDist) {
          setSelectedDistrict(districtGet);
          setWards(selectedDist.wards || []);
        }
      }
    }
  }, [provinces]);

  const handleProvinceChange = useCallback(
    (e) => {
      const provincename = e.target.value;
      setSelectedProvince(provincename);
      setSelectedDistrict("");
      setWards([]);
      const province = provinces.find(
        (p) => p.name.toString() === provincename,
      );
      setDistricts(province ? province.districts : []);
    },
    [provinces],
  );

  const handleDistrictChange = useCallback(
    (e) => {
      const districtName = e.target.value;
      setSelectedDistrict(districtName);
      const district = districts.find(
        (d) => d.name.toString() === districtName,
      );
      setWards(district ? district.wards : []);
    },
    [districts],
  );

  const cartQuantityMap = useMemo(() => {
    return isCart.reduce((acc, item) => {
      acc[item.id] = item.sl;
      return acc;
    }, {});
  }, [isCart]);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchProduct() {
      setLoading(true);
      try {
        const response = await postCart(cartIds);
        setProductListState(response.data.data);
      } catch (error) {
        console.error("❌❌❌ Error fetching products:", error);
      }
      setLoading(false);
    }
    fetchProduct();
    return () => controller.abort();
  }, [cartIds.join(",")]);

  const calculateTotal = () => {
    return productListState.reduce((total, item) => {
      const quantity = cartQuantityMap[item.id] || 0;
      const discountPercent = item.product.active_discount?.value || 0;
      const originalPrice = item.price * quantity;
      const discountAmount = (originalPrice * discountPercent) / 100;
      return total + (originalPrice - discountAmount);
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isCart.length === 0) {
      navigate("/");
      return;
    }
    const { valid } = await checkToken();
    if (
      selectedPayment == "" ||
      phoneState == "" ||
      addressDetail == "" ||
      wardValue == "" ||
      selectedDistrict == "" ||
      selectedProvince == ""
    ) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: "Vui lòng điền thông tin",
      });
      return false;
    }

    if (valid) {
      setIsSubmitting(true);
      const orderData = {
        id_user: userGet.id,
        email: userGet.email,
        name: userGet.last_name + " " + userGet.first_name,
        id_payment: selectedPayment,
        phone: phoneState.trim(),
        note: e.target.note.value.trim(),
        address: `${addressDetail}, ${wardValue}, ${selectedDistrict}, ${selectedProvince}`,
        order_details: productListState.map((item) => ({
          id_variant: item.id,
          quantity: cartQuantityMap[item.id],
          price: item.product?.active_discount
            ? (item.price -
                item.price * (item.product?.active_discount.value / 100)) *
              cartQuantityMap[item.id]
            : item.price * cartQuantityMap[item.id],
        })),
        total_price: calculateTotal() + shippingFee,
      };

      try {
        const result = await postOrder(orderData, Token);

        if (result.data?.status === "success") {
          setIsSubmitting(false);
          dispatch(cartAction.CLEAR_CART_STATE_ONLY());

          // ========================================================
          // XỬ LÝ CHUYỂN HƯỚNG VNPAY
          // Nếu Backend trả về URL thanh toán VNPay -> Chuyển hướng
          // ========================================================
          if (result.data?.vnpay_url) {
            window.location.href = result.data.vnpay_url;
            return; // Dừng thực thi các lệnh phía dưới
          }

          // Dành cho các phương thức thanh toán khác (Ví dụ COD)
          Swal.fire({
            title: result.data.message,
            icon: "success",
            draggable: true,
            color: "#0a402b",
          }).then(() => {
            if (selectedPayment != 1) {
              navigate(`/check-out/${result.data.order}`);
            } else {
              navigate(`/`);
            }
          });
        }
      } catch (error) {
        setIsSubmitting(false);
        Swal.fire({
          icon: "error",
          title: "Lỗi đặt hàng",
          text: "Đã có lỗi xảy ra, vui lòng thử lại!",
        });
      }
    } else {
      Swal.fire({
        title: "Đăng nhập hết hạn",
        showClass: {
          popup: `animate__animated animate__fadeInUp animate__faster`,
        },
        hideClass: {
          popup: `animate__animated animate__fadeOutDown animate__faster`,
        },
      });
      setIsSubmitting(false);
      navigate("/");
    }
  };

  useEffect(() => {
    if (calculateTotal() > 10000000) {
      setShippingFee(0);
    } else {
      if (selectedProvince) {
        switch (selectedProvince) {
          case "Thành phố Hồ Chí Minh":
            setShippingFee(30000);
            break;
          default:
            setShippingFee(60000);
            break;
        }
      }
    }
  }, [selectedProvince, calculateTotal()]);

  useEffect(() => {
    document.title = `Thanh toán | ${import.meta.env.VITE_WEBSITE_NAME}`;
  }, []);

  return (
    <>
      <Card>
        <h1
          data-aos="zoom-in"
          data-aos-delay="400"
          className="text-xl font-semibold md:text-2xl"
        >
          Thông tin đặt hàng
        </h1>

        <Form onSubmit={handleSubmit}>
          <div className="block gap-6 py-6 md:flex">
            <div
              data-aos="fade-right"
              data-aos-delay="400"
              className="w-full md:w-9/12"
            >
              <div className="rounded bg-white px-8 py-6">
                <h5 className="text-2xl italic">Thông tin nhận hàng</h5>
                <div className="py-4">
                  <div className="block gap-4 sm:flex">
                    <p className="mb-4 w-full">
                      <label
                        htmlFor="phone"
                        className="block text-sm/6 font-semibold text-gray-900"
                      >
                        Số điện thoại
                      </label>
                      <input
                        className="shadow-xs focus:outline-hidden mt-1 block h-10 w-full appearance-none rounded-md bg-white px-3 text-slate-900 ring-1 ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 sm:text-sm"
                        type="tel"
                        name="phone"
                        id="phone"
                        placeholder="Nhập số điện thoại"
                        pattern="[0-9]{10,11}"
                        value={phoneState}
                        onChange={(e) => setPhoneState(e.target.value)}
                      />
                    </p>
                  </div>
                  <div className="block gap-4 sm:flex">
                    <p className="mb-4 w-full sm:w-6/12">
                      <label
                        htmlFor="thanh_pho"
                        className="block text-sm/6 font-semibold text-gray-900"
                      >
                        Tỉnh thành
                      </label>
                      <select
                        value={selectedProvince}
                        onChange={handleProvinceChange}
                        className="w-full rounded border p-2"
                      >
                        <option value="">Chọn tỉnh/thành phố</option>
                        {provinces.map((province) => (
                          <option key={province.name} value={province.name}>
                            {province.name}
                          </option>
                        ))}
                      </select>
                    </p>

                    <p className="mb-4 w-full sm:w-6/12">
                      <label
                        htmlFor="huyen"
                        className="block text-sm/6 font-semibold text-gray-900"
                      >
                        Quận huyện
                      </label>
                      <select
                        value={selectedDistrict}
                        onChange={handleDistrictChange}
                        className="w-full rounded border p-2"
                        disabled={!districts.length}
                        name="district"
                      >
                        <option value="">Chọn quận/huyện</option>
                        {districts.map((district) => (
                          <option key={district.code} value={district.name}>
                            {district.name}
                          </option>
                        ))}
                      </select>
                    </p>
                  </div>

                  <div className="block gap-4 sm:flex">
                    <p className="mb-4 w-full sm:w-6/12">
                      <label
                        htmlFor="xa"
                        className="block text-sm/6 font-semibold text-gray-900"
                      >
                        phường xã
                      </label>
                      <select
                        className="w-full rounded border p-2"
                        disabled={!wards.length}
                        name="ward"
                        value={wardValue}
                        onChange={(e) => setWardValue(e.target.value)}
                      >
                        <option value="">Chọn phường/xã</option>
                        {wards.map((ward) => (
                          <option key={ward.code} value={ward.name}>
                            {ward.name}
                          </option>
                        ))}
                      </select>
                    </p>
                    <p className="mb-4 w-full sm:w-6/12">
                      <label
                        htmlFor="address"
                        className="block text-sm/6 font-semibold text-gray-900"
                      >
                        địa chỉ
                      </label>
                      <input
                        className="shadow-xs focus:outline-hidden mt-1 block h-10 w-full appearance-none rounded-md bg-white px-3 text-slate-900 ring-1 ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 sm:text-sm"
                        name="address"
                        type="text"
                        value={addressDetail}
                        onChange={(e) => setAddressDetail(e.target.value)}
                        id="address"
                        placeholder="Nhập số nhà, tên đường..."
                      />
                    </p>
                  </div>
                  <div className="block gap-4 sm:flex">
                    <p className="mb-4 w-full sm:w-6/12">
                      <label
                        htmlFor="note"
                        className="block text-sm/6 font-semibold text-gray-900"
                      >
                        Ghi chú
                      </label>
                      <textarea
                        className="shadow-xs focus:outline-hidden mt-1 block h-10 min-h-20 w-full appearance-none rounded-md bg-white p-2 text-slate-900 ring-1 ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 sm:text-sm"
                        placeholder="Ghi chú giao hàng"
                        name="note"
                      ></textarea>
                    </p>
                    <div className="mb-4 w-full sm:w-6/12">
                      <label
                        htmlFor="methor"
                        className="block text-sm/6 font-semibold text-gray-900"
                      >
                        Phương thức thanh toán
                      </label>

                      {!isFetching && fetchedData?.length > 0 ? (
                        fetchedData.map((item) => (
                          <p key={item.id} className="flex items-center p-1">
                            <input
                              type="radio"
                              id={`payment-${item.id}`}
                              name="methor"
                              value={item.id}
                              className="mr-5 cursor-pointer"
                              onChange={(e) =>
                                setSelectedPayment(e.target.value)
                              }
                            />
                            <label
                              htmlFor={`payment-${item.id}`}
                              className="cursor-pointer text-sm"
                            >
                              {item.payment_method}
                            </label>
                          </p>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">
                          Chưa có phương thức thanh toán
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              data-aos="fade-left"
              data-aos-delay="400"
              className="w-full md:w-3/12"
            >
              <div className="rounded bg-white px-8 py-6">
                <h5 className="text-2xl italic">Đơn hàng</h5>
                {loading ? (
                  <p>Đang tải...</p>
                ) : productListState.length > 0 ? (
                  <ul className="py-4">
                    {productListState.map((item) => (
                      <li key={item.id} className="border-b py-2 text-sm">
                        <p className="pb-1">
                          {item?.product?.name || "Không có tên"}
                        </p>
                        <p className="flex justify-between">
                          <span className="mr-3">Loại: {item?.option}</span>
                          <span>x{cartQuantityMap[item.id]}</span>
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center">Giỏ hàng trống</p>
                )}
                <p className="flex justify-between py-2 text-base font-medium">
                  <span>Sản phẩm:</span>{" "}
                  <span>{calculateTotal().toLocaleString()}</span>
                </p>
                <p className="flex justify-between py-2 text-base font-medium">
                  <span>Phí vận chuyển:</span>{" "}
                  <span>{shippingFee.toLocaleString()}đ</span>
                </p>

                <p className="mb-5 flex justify-between text-xl font-bold italic">
                  <span>Tổng cộng:</span>
                  <span>
                    {(calculateTotal() + shippingFee).toLocaleString()}đ
                  </span>
                </p>

                <BtnLoadingSubmit
                  isPending={isSubmitting}
                  defaultText="Đặt hàng"
                  loadingText="Đang xử lý"
                  typebtn="submit"
                />
              </div>
            </div>
          </div>
        </Form>
      </Card>
    </>
  );
}
