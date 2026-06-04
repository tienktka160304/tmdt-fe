import { createPortal } from "react-dom";
import { CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { cartAction, popupDetailAction } from "../../store";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa6";

export default function ModalDetail({}) {
  const dispatch = useDispatch();
  const fetchedData = useSelector((state) => state.popupDetail.payload);
  const navigate = useNavigate("/");

  const { product_variants } = fetchedData;

  const [variant, setvariant] = useState(product_variants[0]);
  const [mainImg, setmainImg] = useState(variant.image);
  const [count, setCount] = useState(1);
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
    if (count > 1) setCount(count - 1);
  };

  const handleIncrease = () => {
    setCount(count + 1);
  };

  const renderImages = () => {
    return (
      <>
        <div className="w-full">
          <img
            src={`${import.meta.env.VITE_ENDPOINT}${mainImg}`}
            className="w-3/4"
            alt="main"
          />
        </div>
      </>
    );
  };

  function removeItem() {
    dispatch(popupDetailAction.HIDDEN_POPUP());
  }

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

  return createPortal(
    <React.Fragment>
      <div
        onClick={removeItem}
        className={`fixed left-0 top-0 z-40 block h-full w-full bg-black/40 backdrop-blur-sm duration-500`}
      ></div>
      <aside
        className={`fixed left-1/2 top-1/2 z-50 block w-3/4 -translate-x-1/2 -translate-y-1/2 overflow-auto rounded bg-white p-4 transition-all duration-1000 md:p-6`}
      >
        <div className="px-2 py-1 text-right">
          <CgClose className="inline-block text-xl" onClick={removeItem} />
        </div>
        <div
          data-aos="zoom-in"
          data-aos-delay="200"
          className="overflow-hidden px-1"
        >
          <React.Fragment>
            <section className="flex flex-col items-center justify-center md:flex-row">
              <div className="md:w-6/12">
                <div className="flex flex-col-reverse xl:flex-row">
                  {renderImages()}
                </div>
              </div>

              {/* left */}
              <div className="flex flex-col gap-1 md:w-6/12">
                <h2 className="text-lg font-semibold lowercase italic first-letter:uppercase xl:text-xl">
                  {fetchedData.name}
                </h2>
                <div className="pb-1 text-xs font-semibold xl:text-base">
                  <p className="mr-2 inline-block">Lượt xem :</p>
                  {fetchedData.views}
                </div>
                <div className="pb-1 text-xs font-semibold xl:text-base">
                  <p className="mr-2 inline-block">Lượt bán :</p>
                  {fetchedData.total_buy ?? 0}
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
                      className={`mr-2 rounded bg-gray-100 px-2 py-1 text-base font-semibold shadow-sm ${item.id === variant.id ? "border-2 border-primary font-bold" : "text-gray-600"}`}
                    >
                      {item.option}
                    </button>
                  ))}
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
                {variant.stock > 0 ? (
                  <>
                    <div className="flex items-center gap-4 pt-3 md:gap-8">
                      <div className="flex h-12 w-3/12 items-center justify-between rounded border shadow">
                        <button
                          onClick={handleDecrease}
                          className="px-2 text-2xl font-bold text-gray-600 hover:text-black disabled:text-gray-400"
                          disabled={count === 1}
                        >
                          −
                        </button>
                        <span className="text-lg font-medium">{count}</span>
                        <button
                          onClick={handleIncrease}
                          className="px-2 text-2xl font-bold text-primary hover:text-black disabled:text-gray-400"
                          disabled={count === maxQuantity}
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="flex h-12 w-9/12 items-center justify-center rounded border bg-secondary p-2 px-2 text-sm text-white shadow md:text-lg"
                        onClick={() => handleByNow(variant.id, count)}
                      >
                        MUA NGAY
                      </button>
                    </div>
                    <div className="flex space-x-12 pb-3">
                      <button
                        onClick={() => handleAddToCart(variant.id, count)}
                        className="flex h-12 w-full items-center justify-center rounded border bg-primary p-2 px-2 py-2 text-sm text-white shadow md:text-lg"
                      >
                        <FaCartArrowDown className="mr-2 inline-block text-xl" />{" "}
                        THÊM VÀO GIỞ HÀNG
                      </button>
                    </div>
                  </>
                ) : (
                  <h4 className="mt-2 bg-gray-300/50 py-2 text-center font-bold text-red-500">
                    HẾT HÀNG
                  </h4>
                )}
              </div>
            </section>
          </React.Fragment>
        </div>
      </aside>
    </React.Fragment>,
    document.getElementById("modalDetail"),
  );
}
