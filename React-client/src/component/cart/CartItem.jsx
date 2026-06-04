import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { cartAction } from "../../store";
import { FaRegTrashAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function CartItem({ item, cartQuantityMap }) {
  const [quantitySate, setQuantity] = useState(cartQuantityMap);
  const [quantityError, setQuantityError] = useState("");
  const dispatch = useDispatch();

  const salePrice = item.product?.active_discount
    ? item.price - item.price * (item.product?.active_discount.value / 100)
    : item.price;

  const totalPrice = salePrice * quantitySate;

  const handleDecrease = () => {
    if (quantitySate > 1) {
      setQuantity(quantitySate - 1);
      setQuantityError("");
    }
  };

  const handleIncrease = () => {
    if (quantitySate < item.stock) {
      setQuantity(quantitySate + 1);
      setQuantityError("");
    } else {
      setQuantityError(`Tối đa ${item.stock} sản phẩm trong kho.`);
    }
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);

    if (Number.isNaN(value)) {
      setQuantity(1);
      setQuantityError("");
      return;
    }

    if (value < 1) {
      setQuantity(1);
      setQuantityError("Số lượng tối thiểu là 1.");
    } else if (value > item.stock) {
      setQuantity(item.stock);
      setQuantityError(`Tối đa ${item.stock} sản phẩm trong kho.`);
    } else {
      setQuantity(value);
      setQuantityError("");
    }
  };

  useEffect(() => {
    dispatch(
      cartAction.UPDATE_CART({
        id: item.id,
        sl: quantitySate,
      }),
    );
  }, [quantitySate, dispatch, item.id]);

  function hanldeDelete(id) {
    dispatch(cartAction.DELETE_CART(id));
  }

  return (
    <div
      className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-primary/40 hover:shadow-md"
      key={item.id}
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-[2.2fr_1fr_1.2fr_1fr] md:items-center">
        {/* Thông tin sản phẩm */}
        <div className="flex gap-4">
          <NavLink
            to={`/chi-tiet?sp=${item.product.slug}`}
            className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-50"
          >
            <img
              src={`${import.meta.env.VITE_ENDPOINT + item?.image}`}
              alt={item?.product?.name}
              className="h-full w-full object-cover transition hover:scale-105"
            />
          </NavLink>

          <div className="flex min-w-0 flex-col justify-center">
            <NavLink
              className="line-clamp-2 text-base font-semibold capitalize leading-6 text-gray-800 transition hover:text-primary"
              to={`/chi-tiet?sp=${item.product.slug}`}
            >
              {item?.product?.name || "Không có tên"}
            </NavLink>

            <p className="mt-1 text-sm text-gray-500">
              Phiên bản:{" "}
              <span className="font-medium text-gray-700">{item?.option}</span>
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Còn lại trong kho:{" "}
              <span className="font-semibold text-gray-600">{item.stock}</span>
            </p>

            <button
              className="mt-3 flex w-fit items-center gap-2 rounded-lg px-1 text-sm font-medium text-red-500 transition hover:text-red-700"
              onClick={() => hanldeDelete(item.id)}
            >
              <FaRegTrashAlt />
              Xóa
            </button>
          </div>
        </div>

        {/* Đơn giá */}
        <div className="flex flex-col justify-center md:items-center">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400 md:hidden">
            Đơn giá
          </p>

          {item.product?.active_discount ? (
            <div className="text-left md:text-center">
              <p className="text-sm text-gray-400 line-through">
                {Number(item.price).toLocaleString()}đ
              </p>

              <p className="font-bold text-red-500">
                {Number(salePrice).toLocaleString()}đ
              </p>

              <span className="mt-1 inline-block rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-500">
                Giảm {item.product?.active_discount.value}%
              </span>
            </div>
          ) : (
            <p className="font-semibold text-gray-800">
              {Number(item.price).toLocaleString()}đ
            </p>
          )}
        </div>

        {/* Số lượng */}
        <div className="flex flex-col items-start justify-center md:items-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400 md:hidden">
            Số lượng
          </p>

          <div className="flex min-h-[82px] flex-col items-start justify-start md:items-center">
            <div className="flex items-center overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
              <button
                onClick={handleDecrease}
                className="flex h-11 w-11 items-center justify-center text-xl font-bold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300"
                disabled={quantitySate === 1}
              >
                −
              </button>

              <input
                type="number"
                min={1}
                max={item.stock}
                value={quantitySate}
                onChange={handleQuantityChange}
                className="h-11 w-16 appearance-none border-x border-gray-200 text-center text-base font-semibold outline-none"
              />

              <button
                onClick={handleIncrease}
                className="flex h-11 w-11 items-center justify-center text-xl font-bold text-primary transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300"
                disabled={quantitySate >= item.stock}
              >
                +
              </button>
            </div>

            <p className="mt-1 text-xs text-gray-400">Tối đa: {item.stock}</p>

            <p className="mt-1 min-h-[18px] text-xs font-medium text-red-500">
              {quantityError || ""}
            </p>
          </div>
        </div>

        {/* Thành tiền */}
        <div className="flex flex-col justify-center md:items-center">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400 md:hidden">
            Thành tiền
          </p>

          <p className="text-lg font-bold text-primary">
            {Number(totalPrice).toLocaleString()}đ
          </p>
        </div>
      </div>
    </div>
  );
}
