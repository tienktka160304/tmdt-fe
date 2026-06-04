import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import CartItem from "../component/cart/CartItem";
import Card from "../component/shared/Card";
import { getToken } from "../util/auth";
import { popupAuthAction } from "../store";
import Swal from "sweetalert2";
import { checkToken } from "../api/user";
import { postCart } from "../api/order";
import Breadcrumb from "../component/shared/Breadcrumb";
import BtnAnimation from "../component/shared/BtnAnimation";

export default function Cart() {
  const isCart = useSelector((state) => state.cart);
  const [productListState, setProductListState] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartIds = useMemo(() => isCart.map((item) => item.id), [isCart]);

  useEffect(() => {
    // document.title = "Giỏ hàng | xedap_3s";
    document.title = `Giỏ hàng | ${import.meta.env.VITE_WEBSITE_NAME}`;
  }, []);

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

    if (cartIds.length > 0) {
      fetchProduct();
    } else {
      setProductListState([]);
    }

    return () => controller.abort();
  }, [cartIds.join(",")]);

  const calculateTotal = () => {
    return productListState.reduce((total, item) => {
      const quantity = cartQuantityMap[item.id] || 0;
      const discountPercent = item.product.active_discount?.value || 0; // Lấy giảm giá %
      const originalPrice = item.price * quantity; // Giá gốc
      const discountAmount = (originalPrice * discountPercent) / 100; // Số tiền giảm giá
      return total + (originalPrice - discountAmount); // Tổng tiền sau giảm
    }, 0);
  };

  async function hanldeNavigateCheckOut() {
    const token = getToken();
    if (!token) {
      Swal.fire({
        title: "Đăng nhập",
        text: "Bạn cần đăng nhập để thanh toán !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Có",
        cancelButtonText: "Không",
        confirmButtonColor: "#0a402b",
        cancelButtonColor: "black",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(popupAuthAction.SHOW_POPUP());
        }
      });
      return;
    }

    const { valid } = await checkToken();

    if (valid) {
      navigate("/check-out");
    } else {
      Swal.fire({
        title: "Đăng nhập hết hạn",
        showClass: {
          popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `,
        },
        hideClass: {
          popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `,
        },
      });

      dispatch(popupAuthAction.SHOW_POPUP());
    }
  }

  return (
    <>
      <Breadcrumb
        nav1=""
        nav1Link=""
        nav2=""
        nav2Link=""
        navEnd="Giỏ hàng của bạn"
      />
      <Card>
        <h1
          data-aos="fade-down"
          data-aos-delay="400"
          className="text-xl font-semibold md:text-2xl"
        >
          Giỏ hàng của bạn
        </h1>
        <div className="flex flex-col-reverse gap-4 py-6 lg:flex-row xl:gap-6">
          <div data-aos="fade-right" data-aos-delay="400" className="lg:w-9/12">
            <div className="rounded bg-white px-3 py-2 sm:px-4 sm:py-6 xl:px-8">
              <div className="gridColTable border-b-2 border-primary pb-4 text-sm uppercase italic sm:font-medium md:text-base xl:text-lg">
                <div>Thông tin sản phẩm</div>
                <div className="hidden text-center sm:block">Đơn giá</div>
                <div className="hidden text-center sm:block">Số lượng</div>
                <div className="hidden text-center sm:block">Thành tiền</div>
              </div>
              {/*  */}

              {loading ? (
                <p>Đang tải...</p>
              ) : productListState.length > 0 ? (
                productListState.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    cartQuantityMap={cartQuantityMap[item.id]}
                  />
                ))
              ) : (
                <div className="mx-auto w-96">
                  <img src="/cart-empty.png" className="w-96" alt="a" />
                </div>
              )}

              <div className="flex items-center justify-between py-2 md:py-5">
                <BtnAnimation>
                  <NavLink
                    to="/san-pham"
                    className="flex items-center rounded-sm bg-secondary/60 px-2 py-2 text-sm font-medium italic text-primary shadow sm:px-4 md:px-6 xl:text-lg"
                  >
                    <FaArrowLeftLong className="mr-1 text-base sm:text-lg md:mr-3 xl:text-2xl" />
                    Tiếp tục mua hàng
                  </NavLink>
                </BtnAnimation>
                {loading ? (
                  ""
                ) : productListState.length > 0 ? (
                  <BtnAnimation>
                    <button
                      onClick={hanldeNavigateCheckOut}
                      className="flex items-center rounded-sm bg-primary px-2 py-2 text-sm font-medium italic text-white shadow sm:px-4 md:px-6 xl:text-lg"
                    >
                      Thanh Toán
                      <FaArrowRightLong className="ml-1 text-base sm:text-lg md:ml-3 xl:text-2xl" />
                    </button>
                  </BtnAnimation>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div data-aos="fade-left" data-aos-delay="400" className="lg:w-3/12">
            <div className="rounded bg-white px-3 py-6 sm:px-4 xl:px-8">
              <h4 className="pb-4 text-sm font-medium uppercase italic md:text-base xl:text-lg">
                Tổng Tính
              </h4>
              <p className="flex items-center justify-between pb-2">
                <span className="text-xs font-medium sm:text-sm xl:text-base">
                  Phí giao hàng:(tạm tính)
                </span>
                <span className="text-xs font-medium sm:text-sm xl:text-base">
                  {calculateTotal() > 10000000 ? "0đ" : "30.000đ"}
                </span>
              </p>
              <p className="flex items-center justify-between pb-2">
                <span className="text-xs font-medium sm:text-sm xl:text-base">
                  Tiền:
                </span>
                <span className="text-xs font-medium sm:text-sm xl:text-base">
                  {calculateTotal().toLocaleString()}đ
                </span>
              </p>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
