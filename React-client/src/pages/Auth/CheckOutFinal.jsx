import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hook/useFeach";
import { getToken, getUser } from "../../util/auth";
import LoadingThanhToan from "../../component/loadingThanhToan/LoadingThanhToan";
import { checkToken } from "../../api/user";
import { getOrderByid } from "../../api/order";

export default function CheckOutFinal() {
  const navigate = useNavigate();
  const { id } = useParams();
  const Token = getToken();
  const user = getUser();

  useEffect(() => {
    async function kt() {
      const { valid } = await checkToken();
      if (!valid) navigate("/");
    }

    if (!Token) {
      navigate("/");
      return;
    }

    kt();
  }, [Token, navigate]);

  const { isFetching, fetchedData } = useFetch(
    () => getOrderByid(id, Token),
    [],
  );

  useEffect(() => {
    if (!isFetching && fetchedData && Object.keys(fetchedData).length > 0) {
      if (user?.id != fetchedData.id_user) {
        navigate("/");
        return;
      }

      if (fetchedData.id_payment === 1) {
        navigate("/");
      }
    }
  }, [isFetching, fetchedData, user, navigate]);

  useEffect(() => {
    document.title = `Thanh toán đơn hàng | ${import.meta.env.VITE_WEBSITE_NAME}`;
  }, []);

  const isPaid = fetchedData?.thanh_toan == 1;

  return (
    <section className="bg-gray-50 py-10">
      <div className="container">
        <h1 className="mb-6 text-xl font-semibold md:text-2xl">
          Thanh Toán Đơn Hàng
        </h1>

        <div
          data-aos="zoom-in"
          data-aos-delay="400"
          className="mx-auto max-w-xl rounded-2xl bg-white p-6 text-center shadow-lg"
        >
          {isFetching ? (
            <p>Đang tải...</p>
          ) : fetchedData && Object.keys(fetchedData).length > 0 ? (
            <>
              <h4 className="mb-2 text-2xl font-bold text-gray-800">
                {isPaid ? "Thanh toán thành công" : "Chờ thanh toán đơn hàng"}
              </h4>

              <p className="mb-5 text-sm text-gray-600">
                {isPaid
                  ? "Cảm ơn bạn đã thanh toán. Đơn hàng của bạn đang được xử lý."
                  : "Vui lòng quét mã QR bên dưới để hoàn tất thanh toán."}
              </p>

              {!isPaid && (
                <>
                  <LoadingThanhToan idDonHang={fetchedData.id} />

                  <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <img
                      src="/images/Qrcode.jpg"
                      alt="QR Code"
                      className="mx-auto w-80 rounded-lg bg-white p-2 shadow"
                    />

                    <div className="mt-5 space-y-2 text-left text-sm">
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-500">Người nhận</span>
                        <span className="font-semibold text-gray-800">
                          NGUYEN VIET TIEN
                        </span>
                      </div>

                      <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-500">Mã đơn hàng</span>
                        <span className="font-semibold text-gray-800">
                          MDH:{fetchedData.id}
                        </span>
                      </div>

                      <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-500">Số tiền</span>
                        <span className="font-bold text-red-600">
                          {Number(fetchedData.total_price).toLocaleString()}đ
                        </span>
                      </div>

                      <div className="rounded-lg bg-yellow-50 p-3 text-center text-sm text-yellow-700">
                        Nội dung chuyển khoản: <b>MDH:{fetchedData.id}</b>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {isPaid && (
                <div className="mt-4 rounded-xl bg-green-100 px-6 py-4 text-green-700">
                  Đơn hàng #{fetchedData.id} đã được thanh toán thành công.
                </div>
              )}
            </>
          ) : (
            <p>Không có dữ liệu</p>
          )}
        </div>
      </div>
    </section>
  );
}
