import { useLoaderData } from "react-router-dom";
import { CancelOrder, fetchHistoryOrder } from "../../api/historyOrder";
import Card from "../../component/shared/Card";
import React, { useEffect, useState } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import BtnAnimation from "../../component/shared/BtnAnimation";
import Swal from "sweetalert2";
import Breadcrumb from "../../component/shared/Breadcrumb";

export default function HistoryOrder(params) {
  const order = useLoaderData();
  const [expandedRows, setExpandedRows] = useState({});
  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  async function fetchingCancelOrder(id) {
    const result = await CancelOrder(id);
    if (result.status) {
      const mess = result.data.message;
      Swal.fire({
        title: mess,
        icon: "success",
        draggable: true,
        confirmButtonText: "Đóng",
        buttonsStyling: false,
        customClass: {
          confirmButton: "bg-red-400 text-white rounded-lg px-4 py-2",
        },
      }).then(() => {
        window.location.reload();
      });

      return;
    } else {
      const mess = result.data.message;
      Swal.fire({
        title: mess,
        icon: "error",
        draggable: true,
      });
    }
  }

  function HandleCancelOrder(id) {
    Swal.fire({
      title: "Hủy đơn hàng",
      text: "Bạn có chắc chắn muốn hủy đơn hàng này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Có, Hủy",
      cancelButtonText: "Không",
      confirmButtonColor: "#0a402b",
      cancelButtonColor: "black",
    }).then((result) => {
      if (result.isConfirmed) {
        fetchingCancelOrder(id);
      }
    });
  }
  useEffect(() => {
    document.title = `Lịch sử đặt hàng | ${import.meta.env.VITE_WEBSITE_NAME}`;
  }, []);
  return (
    <>
      <Breadcrumb nav1="" nav1Link="" nav2="" nav2Link="" navEnd="Đơn hàng" />
      <Card>
        <h1 className="text-xl font-semibold md:text-2xl">Đơn hàng của bạn</h1>
        <section
          data-aos="zoom-in"
          data-aos-delay="400"
          className="container mx-auto p-6"
        >
          <div className="mb-8 w-full overflow-hidden rounded-lg shadow-lg">
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-600 bg-gray-100 text-left text-sm font-semibold uppercase text-gray-900">
                    <th className="px-2 py-3">MDH</th>
                    <th className="px-2 py-3">Phương thức thanh toán</th>
                    <th className="px-2 py-3">Trạng Thái</th>
                    <th className="px-2 py-3">Thanh toán</th>
                    <th className="px-2 py-3">Điện thoại</th>
                    <th className="px-2 py-3">Địa chỉ</th>
                    <th className="px-2 py-3">Tổng tiền</th>
                    <th className="px-2 py-3">Ngày đặt</th>
                    <th className="px-2 py-3">Ghi chú</th>
                    <th className="px-2 py-3">Hoạt động</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-center">
                  {order?.orders?.map((item) => (
                    <React.Fragment key={item.id}>
                      <tr className="text-gray-700">
                        <td className="border px-2 py-3 text-sm font-semibold">
                          <button
                            className="px-2 py-1"
                            onClick={() => toggleRow(item.id)}
                          >
                            {expandedRows[item.id] ? (
                              <FaMinusCircle className="inline-block text-lg text-red-600" />
                            ) : (
                              <FaPlusCircle className="inline-block text-lg text-green-600" />
                            )}
                          </button>
                          MDH{item.id}
                        </td>
                        <td className="w-48 border px-2 py-3 text-sm">
                          {item.payment.payment_method}
                        </td>
                        <td className="w-28 border px-2 py-3 text-center text-sm">
                          {item.status === 0 && (
                            <span className="rounded-sm bg-red-100 px-2 py-1 font-semibold leading-tight text-red-700">
                              Đã hủy
                            </span>
                          )}
                          {item.status === 1 && (
                            <span className="rounded-sm bg-blue-100 px-2 py-1 font-semibold leading-tight text-gray-600">
                              Chờ xữ lý
                            </span>
                          )}
                          {item.status === 2 && (
                            <span className="rounded-sm bg-green-100 px-2 py-1 font-semibold leading-tight text-blue-600">
                              Đang giao
                            </span>
                          )}
                          {item.status === 3 && (
                            <span className="rounded-sm bg-green-100 px-2 py-1 font-semibold leading-tight text-green-600">
                              Hoàn tất
                            </span>
                          )}
                        </td>
                        <td className="w-40 border px-2 py-3 text-center text-sm">
                          {item.thanh_toan === 1 ? (
                            <span className="bg-green-300 px-2 py-1 font-semibold text-gray-600">
                              đã thanh toán
                            </span>
                          ) : (
                            <span className="bg-green-300 px-2 py-1 font-semibold text-gray-600">
                              Chưa thanh toán
                            </span>
                          )}
                        </td>
                        <td className="w-28 border px-2 py-3">{item.phone}</td>

                        <td className="w-64 border px-2 py-3 text-sm">
                          {item.address}
                        </td>
                        <td className="w-32 border px-2 py-3 text-sm">
                          {Number(item.total_price).toLocaleString()} đ
                        </td>
                        <td className="w-28 border px-2 py-3 text-sm">
                          {item.order_date}
                        </td>
                        <td className="border px-2 py-3 text-sm">
                          {item.note ? item.note : "không có ghi chú"}
                        </td>
                        <td className="border px-2 py-3 text-center text-sm">
                          <BtnAnimation>
                            <button
                              disabled={item.status !== 1}
                              className="rounded-md bg-green-400 px-4 py-1 text-white shadow disabled:cursor-not-allowed disabled:bg-gray-400"
                              onClick={() => {
                                HandleCancelOrder(item.id);
                              }}
                            >
                              HỦY
                            </button>
                          </BtnAnimation>
                        </td>
                      </tr>

                      {expandedRows[item.id] && (
                        <tr>
                          <td
                            colSpan="10"
                            className="border bg-gray-50 p-3 text-left"
                          >
                            <strong>Chi tiết sản phẩm: </strong>
                            <ul className="ml-5 mt-2 list-decimal pl-6">
                              {item.orders_detail?.map((detail) => (
                                <li key={detail.id} className="border-b py-1">
                                  <span>
                                    {detail.product_variant.product.name}
                                  </span>
                                  <span>
                                    ( {detail.product_variant.option})
                                  </span>
                                  <br />
                                  <span className="mr-10">
                                    <span className="mr-2 font-bold">
                                      giá bán:
                                    </span>
                                    {Number(detail.price).toLocaleString()}đ
                                  </span>
                                  <span>số lượng: {detail.quantity}</span>
                                </li>
                              ))}
                            </ul>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </Card>
    </>
  );
}

export async function loader() {
  return fetchHistoryOrder();
}
