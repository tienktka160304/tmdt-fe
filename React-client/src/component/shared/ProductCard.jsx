import { FaRegHeart } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { getToken } from "../../util/auth";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { popupAuthAction, popupDetailAction } from "../../store";
import { motion } from "framer-motion";
import {
  addFavoriteProduct,
  removeFavoriteProduct,
} from "../../store/favoriteSlice";

export default function ProductCard({ product, delay, dataaos = "fade-up" }) {
  const price = product.product_variants[0]?.price || 0;
  const discountValue = product.discount?.value;
  const dispatch = useDispatch();

  function getItemDetail(item) {
    dispatch(popupDetailAction.SHOW_POPUP(item));
  }

  const priceDiscount =
    product.discount == null ? price : price - price * (discountValue / 100);
  const favoriteProducts = useSelector((state) => state.favorites.list);
  const isFavorite = favoriteProducts.some((fav) => fav.id === product.id);

  const handleAddFavorite = async () => {
    if (!getToken()) {
      Swal.fire({
        title: "Đăng nhập",
        text: "Bạn có muốn Đăng Nhập để thích sản phẩm ?",
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
    if (isFavorite) {
      dispatch(removeFavoriteProduct(product.id));
    } else {
      dispatch(addFavoriteProduct(product.id));
    }
  };

  return (
    <>
      <div
        data-aos={dataaos}
        data-aos-delay={(100 * delay) % 800}
        className="group max-w-sm overflow-hidden rounded bg-white shadow-sm duration-500 hover:-translate-y-1 hover:scale-[1.01] hover:border hover:shadow-md"
      >
        <div className="relative w-full overflow-hidden">
          {product.hot_product == 1 ? (
            <div className="absolute left-1 top-3 z-[1] -translate-x-1/3 -translate-y-1/3 -rotate-[40deg] animate-pulse bg-red-700 px-8 text-sm text-white">
              <span className="font-medium text-yellow-200 shadow-sm">HOT</span>
            </div>
          ) : (
            ""
          )}
          <NavLink to={`/chi-tiet?sp=${product.slug}`} className="">
            {/* Đã Fix: Kiểm tra an toàn URL cho ảnh sản phẩm */}
            <img
              src={
                product.product_variants[0]?.image?.startsWith("http")
                  ? product.product_variants[0].image
                  : `${import.meta.env.VITE_ENDPOINT}${product.product_variants[0]?.image || ""}`
              }
              alt={product.name || "Product image"}
              className="h-44 w-full object-contain p-1 duration-700 group-hover:scale-110 md:p-4 xl:h-60"
            />
          </NavLink>

          <div className="absolute bottom-0 left-1">
            {/* Đã Fix: Kiểm tra an toàn URL cho Logo Brand */}
            <img
              src={
                product.brand?.logo?.startsWith("http")
                  ? product.brand.logo
                  : `${import.meta.env.VITE_ENDPOINT}${product.brand?.logo || ""}`
              }
              alt={product.brand?.name || "Brand logo"}
              className="max-h-10 max-w-16 object-cover"
            />
          </div>

          <div className="flex flex-col gap-y-1 duration-75 ease-in-out">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAddFavorite()}
              className="absolute right-4 top-4 rounded-xl bg-gray-200/85 p-2 text-lg shadow-md hover:bg-white sm:text-2xl"
            >
              <FaRegHeart
                className={`hover:text-red-600 ${isFavorite ? "text-red-500" : ""}`}
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => getItemDetail(product)}
              className="absolute right-4 top-16 hidden rounded-xl bg-gray-200/85 p-2 text-lg shadow-md hover:bg-white hover:text-primary group-hover:inline group-hover:animate-jump sm:text-2xl"
            >
              <FaRegEye />
            </motion.button>
          </div>
        </div>
        <div className="flex flex-col justify-items-end px-4 pb-2 pt-0">
          <h3
            className="flex h-11 items-center text-sm font-medium text-primary sm:text-base md:h-[56px]"
            title={product.name}
          >
            <NavLink
              className="line-clamp-2 font-medium lowercase leading-4 first-letter:uppercase md:leading-6"
              to={`/chi-tiet?sp=${product.slug}`}
            >
              {product.name}
            </NavLink>
          </h3>
          <div className="flex flex-wrap-reverse items-center justify-between">
            {product.discount == null && (
              <>
                <p className="pr-5 text-sm font-medium text-black">
                  {Number(price).toLocaleString()} đ
                </p>
              </>
            )}

            {product.discount !== null && (
              <>
                <p className="pr-5 text-xs text-gray-300 line-through sm:text-sm">
                  {Number(price).toLocaleString()} đ
                </p>
              </>
            )}

            <p className="text-xs uppercase italic">
              {product.sub_category?.name}
            </p>
          </div>

          {product.discount !== null && (
            <div className="flex items-center">
              <p className="text-sm font-bold text-price sm:text-base">
                {Number(priceDiscount).toLocaleString()}đ
              </p>

              <span className="label inline-block rotate-1 rounded-sm bg-red-500 pl-3 pr-1 text-[10px] text-white">
                {discountValue}%
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}