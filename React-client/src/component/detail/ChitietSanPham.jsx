import { memo, useEffect, useMemo, useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { cartAction } from "../../store";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BtnAnimation from "../shared/BtnAnimation";

function ChitietSanPham({ fetchedData }) {
  const dispatch = useDispatch();
  const { product_variants } = fetchedData;
  const navigate = useNavigate();
  const [variant, setvariant] = useState(product_variants[0]);
  const [mainImg, setmainImg] = useState(variant.image);
  const [count, setCount] = useState(1);
  const [quantityError, setQuantityError] = useState("");
  const maxQuantity = variant.stock;

  function handleAddToCart(id, sl) {
    const cart = JSON.parse(localStorage.getItem("laptop_cart")) || [];
    const index = cart.findIndex((item) => item.id === id);

    if (index !== -1) {
      if (cart[index].sl + sl > maxQuantity) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Số lượng trong giở hàng và hiện tại vướt quá",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
    }

    dispatch(
      cartAction.ADD_CART({
        id: id,
        sl: sl,
      }),
    );
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Đã thêm vào giở hàng",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  function handleByNow(id, sl) {
    const cart = JSON.parse(localStorage.getItem("laptop_cart")) || [];
    const index = cart.findIndex((item) => item.id === id);

    if (index !== -1) {
      if (cart[index].sl + sl > maxQuantity) {
        alert(`Số lượng trong giở hàng và hiện tại vướt quá`);
        navigate("/cart");
        return;
      }
    }

    dispatch(
      cartAction.ADD_CART({
        id: id,
        sl: sl,
      }),
    );
    setTimeout(() => {
      navigate("/cart");
    }, 100);
    return;
  }

  useEffect(() => {
    setmainImg(variant.image);
    setCount(1);
  }, [variant]);

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
      setQuantityError("");
    }
  };

  const handleIncrease = () => {
    if (count < maxQuantity) {
      setCount(count + 1);
      setQuantityError("");
    }
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);

    if (Number.isNaN(value)) {
      setCount(1);
      setQuantityError("Số lượng phải là số nguyên.");
      return;
    }

    if (value < 1) {
      setCount(1);
      setQuantityError("Số lượng tối thiểu là 1.");
    } else if (value > maxQuantity) {
      setCount(maxQuantity);
      setQuantityError(`Số lượng tối đa là ${maxQuantity}.`);
    } else {
      setCount(value);
      setQuantityError("");
    }
  };

  const buildImg = (path) => {
    if (!path) return "";

    return `${import.meta.env.VITE_ENDPOINT}/${path.replace(/^\/+/, "")}`;
  };

  const imgChild = useMemo(() => {
    return [...(fetchedData?.images ?? [])]
      .sort((a, b) => a.sort - b.sort)
      .slice(0, 5);
  }, [fetchedData]);

  const renderImages = () => {
    if (imgChild?.length === 0) {
      return (
        <div className="w-12/12">
          <img
            src={`${import.meta.env.VITE_ENDPOINT}/${mainImg}`}
            className="w-full"
            alt="default"
          />
        </div>
      );
    }
    return (
      <>
        <div className="w-full xl:w-24">
          {imgChild.map((item, index) => (
            <div
              data-aos="fade-right"
              data-aos-delay={400 * index}
              className="mb-2 mr-1 inline-block h-16 w-16 cursor-pointer border p-1 duration-300 hover:scale-105 xl:m-1 xl:block xl:h-20 xl:w-20"
              key={index}
              onClick={() => setmainImg(item.img_products)}
            >
              <img
                //src={`${import.meta.env.VITE_ENDPOINT}/${item?.img_products}`}
                src={buildImg(item.img_products)}
                alt={`Ảnh ${index}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
        <div
          data-aos="zoom-in"
          data-aos-delay="200"
          className="mx-auto w-10/12 xl:w-auto"
        >
          <img
            //src={`${import.meta.env.VITE_ENDPOINT}${mainImg}`}
            src={buildImg(mainImg)}
            className="w-full"
            alt="main"
          />
        </div>
      </>
    );
  };

  const priceRender = () => {
    const priceInt = parseInt(variant.price) * count;
    const priceDiscount =
      fetchedData.discount == null
        ? priceInt
        : priceInt - priceInt * (fetchedData.discount.value / 100);

    if (!fetchedData.discount) {
      return (
        <div>
          <p className="flex items-end gap-x-6">
            <span className="text-xl font-bold text-price">
              {Number(priceInt).toLocaleString()}đ
            </span>
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <p className="flex items-end gap-x-6">
            <span className="text-xl font-bold text-price">
              {Number(priceDiscount).toLocaleString()}đ
            </span>

            <span className="text-base font-medium text-gray-500 line-through">
              {Number(priceInt).toLocaleString()}đ
            </span>
          </p>
          <p className="animate-pulse text-sm font-bold">
            (<span className="mx-1"> Tiết kiệm:</span>
            <span className="mx-1 text-red-400">
              {Number(priceInt - priceDiscount).toLocaleString()}đ
            </span>
            )
            <span className="label inline-block rounded-sm bg-red-500 pl-4 pr-2 text-xs text-white">
              {fetchedData.discount.value}%
            </span>
          </p>
        </div>
      );
    }
  };

  return (
    <>
      <section className="container flex flex-col py-4 sm:py-6 lg:flex-row lg:space-x-4">
        <div className="w-full lg:w-6/12 lg:pr-7 xl:w-7/12">
          <div className="flex flex-col-reverse py-2 sm:py-6 xl:static xl:flex-row xl:space-x-2">
            {renderImages()}
          </div>
        </div>

        {/* left */}
        <div
          data-aos="fade-left"
          data-aos-delay="400"
          className="flex w-full flex-col gap-1 lg:w-6/12 xl:w-5/12"
        >
          <h2 className="text-2xl font-semibold lowercase italic first-letter:uppercase xl:text-3xl">
            {fetchedData.name}
          </h2>
          <div className="flex gap-5">
            <div className="pb-1 text-xs font-semibold xl:text-base">
              <p className="mr-2 inline-block">Lượt xem :</p>
              {fetchedData.views}
            </div>
            <div className="pb-1 text-xs font-semibold xl:text-base">
              <p className="mr-2 inline-block">Lượt bán :</p>
              {fetchedData.total_buy ?? 0}
            </div>
          </div>
          {/* gia */}
          {priceRender()} {/* xem */}
          {/* biên thể  */}
          <div className="pb-3">
            <p className="py-2 text-sm font-semibold xl:text-lg">
              Loại sản phẩm
            </p>

            {product_variants.map((item) => (
              <button
                onClick={() => setvariant(item)}
                key={item.id}
                className={`mr-2 rounded bg-gray-100 px-6 py-1 text-base font-semibold shadow-sm duration-300 hover:scale-110 hover:bg-gray-200 active:scale-95 ${item.id === variant.id ? "border-2 border-primary font-bold" : "text-gray-600"}`}
              >
                {item.option}
              </button>
            ))}
          </div>
          <div className="relative my-4 w-full border-2 border-dashed border-primary p-4">
            <div className="absolute left-1/2 top-0 w-9/12 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-white px-5 py-1 text-center text-sm font-semibold uppercase xl:text-base 2xl:font-bold">
              chính sách khi mua TMDT
            </div>
            <ul className="ml-6 list-disc pt-4 text-sm">
              <li>
                Miễn phí ship giao hàng khi mua TMDT, không áp dụng với các sản
                phẩm đang có khuyến mãi từ 50%
              </li>
              <li> Được phép kiểm trả hàng</li>
              <li> Đổi trả trong 30 ngày nếu sản phẩm lỗi bất kì</li>
            </ul>
          </div>
          <p>
            <span className="mr-2 py-1 text-sm font-semibold xl:text-base">
              Thương hiệu:
            </span>
            <NavLink
              className="text-sm font-medium text-blue-700 underline xl:text-base"
              to={`/san-pham?brand=${fetchedData.brand?.slug}`}
            >
              {fetchedData.brand?.name}
            </NavLink>
          </p>
          <p>
            <span className="mr-2 py-1 text-sm font-semibold xl:text-base">
              Danh mục sản phẩm:
            </span>
            <NavLink
              className="text-sm font-medium text-blue-700 underline xl:text-base"
              to={`/san-pham?category=${fetchedData.sub_category?.slug}`}
            >
              {fetchedData.sub_category?.name}
            </NavLink>
          </p>
          {/* nhóm đối tượng */}
          <p>
            <span className="mr-2 py-1 text-sm font-semibold xl:text-base">
              Nhóm đối tượng:
            </span>
            {fetchedData.product_customer_segments.length > 0
              ? fetchedData.product_customer_segments
                  .map((item) => (
                    <NavLink
                      key={item.id}
                      className="ml-2 text-sm font-medium text-blue-700 underline xl:text-base"
                      to={`/san-pham?dt=${item.customer_segment.id}`}
                    >
                      {item.customer_segment.name}
                    </NavLink>
                  ))
                  .reduce((prev, curr) => [prev, ", ", curr])
              : "Chưa xác định"}
          </p>
          {variant.stock > 0 ? (
            <>
              <div className="flex items-center gap-4 pt-3 md:gap-8">
                <div className="flex h-12 w-3/12 items-center justify-between rounded border shadow">
                  <BtnAnimation>
                    <button
                      onClick={handleDecrease}
                      className="px-4 text-2xl font-bold text-gray-600 hover:text-black disabled:cursor-not-allowed disabled:text-gray-400"
                      disabled={count === 1}
                    >
                      −
                    </button>
                  </BtnAnimation>
                  <input
                    type="number"
                    min={1}
                    max={maxQuantity}
                    value={count}
                    onChange={handleQuantityChange}
                    className="w-16 border-none bg-transparent text-center text-lg font-medium outline-none"
                  />
                  <BtnAnimation>
                    <button
                      onClick={handleIncrease}
                      className="px-4 text-2xl font-bold text-primary hover:text-black disabled:cursor-not-allowed disabled:text-gray-400"
                      disabled={count === maxQuantity}
                    >
                      +
                    </button>
                  </BtnAnimation>
                </div>

                <button
                  className="flex h-12 w-9/12 items-center justify-center rounded border bg-secondary p-2 px-16 text-base text-white shadow duration-300 hover:scale-105 hover:bg-green-700 active:scale-95 md:text-lg lg:text-xl"
                  onClick={() => handleByNow(variant.id, count)}
                >
                  MUA NGAY
                </button>
              </div>
              {quantityError && (
                <p className="mt-2 text-sm text-red-500">{quantityError}</p>
              )}
              <p className="mt-2 text-sm text-gray-600">
                Tối đa có thể mua: {maxQuantity} sản phẩm
              </p>
              <div className="flex space-x-12 pb-3">
                <button
                  onClick={() => handleAddToCart(variant.id, count)}
                  className="flex h-12 w-full items-center justify-center rounded border bg-primary p-2 px-16 py-2 text-base text-white shadow duration-300 hover:scale-105 hover:bg-black active:scale-95 md:text-lg lg:text-xl"
                >
                  <FaCartArrowDown className="mr-2 inline-block text-xl" /> THÊM
                  VÀO GIỎ HÀNG
                </button>
              </div>
            </>
          ) : (
            <h4 className="mt-2 bg-gray-300/50 py-2 text-center font-bold text-red-500">
              HẾT HÀNG
            </h4>
          )}
          {/* mua hang */}
          <div className="py-1">
            <span className="mr-2 py-2 text-lg font-semibold">
              Phương thức thanh toán
            </span>

            <div className="flex space-x-6">
              <img src="momo.png" alt="" className="w-28" />
              <img src="trustbadge_41.png" alt="" className="w-28" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(ChitietSanPham);
