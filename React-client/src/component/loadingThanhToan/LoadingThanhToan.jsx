import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { KTThanhToan } from "../../api/order";
import { NavLink } from "react-router-dom";

export default function LoadingThanhToan({ idDonHang }) {
  const [isPaid, setIsPaid] = useState(false);

  const fetchData = async () => {
    try {
      const result = await KTThanhToan(idDonHang);
      if (result.success) {
        setIsPaid(true);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Gọi API lần đầu

    const interval = setInterval(() => {
      if (!isPaid) {
        fetchData();
      } else {
        clearInterval(interval);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaid]);

  return (
    <>
      {!isPaid ? (
        <>
          <h6 className="">Vui lòng thanh toán đơn hàng</h6>
          <p>
            <AiOutlineLoading3Quarters className="inline-block animate-spin text-4xl text-green-700" />
          </p>
        </>
      ) : (
        <>
          <h6 className="">Thanh toán thành công</h6>
          <p>
            <IoMdCheckmarkCircleOutline className="inline-block text-5xl text-green-700" />
          </p>
          <NavLink
            to="/"
            className="mt-4 rounded-xl bg-green-500 px-5 py-1 text-base font-medium text-white"
          >
            Về trang chủ
          </NavLink>
        </>
      )}
    </>
  );
}
