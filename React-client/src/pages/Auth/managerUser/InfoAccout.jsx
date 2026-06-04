import { useFetch } from "../../../hook/useFeach";
import { NavLink } from "react-router-dom";
import { fetchUserActive } from "../../../api/user";
import BtnAnimation from "../../../component/shared/BtnAnimation";
import { MdModeEdit } from "react-icons/md";

export default function InfoAccout() {
  const { isFetching, fetchedData } = useFetch(fetchUserActive, []);

  function formatDateTime(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  return (
    <>
      {isFetching && !fetchedData.data?.length && <p>Vui lòng đợi !</p>}
      {!isFetching &&
        fetchedData.data?.length &&
        fetchedData.data.map((item) => (
          <div
            data-aos="zoom-in"
            data-aos-delay="400"
            key={item.id}
            className="flex flex-col items-center gap-2"
          >
            {item.avatar ? (
              <img
                src={`${import.meta.env.VITE_ENDPOINT + item.avatar}`}
                alt="avatar"
                className="h-36 w-36 rounded-full border object-cover p-1 shadow-md"
              />
            ) : (
              <img
                src="/18.png"
                alt="avatar"
                className="h-36 w-36 rounded-full border object-cover p-1 shadow-md"
              />
            )}
            <div className="text-2xl uppercase">
              {item.last_name} {item.first_name}
            </div>
            <div className="text-lg italic text-gray-400">{item.email}</div>
            <div className="my-4 inline-block">
              <BtnAnimation>
                <NavLink
                  to={"/manager-user/edit-password"}
                  className="s flex items-center justify-center border border-orange-400 px-6 py-2 text-sm text-gray-600 hover:bg-gray-100"
                >
                  <MdModeEdit className="mr-2 text-lg text-orange-400" />
                  Đổi mật khẩu
                </NavLink>
              </BtnAnimation>
            </div>
            <div className="w-full space-y-4 border px-6 py-8 text-gray-700">
              <h2 className="mb-6 text-3xl font-normal text-gray-600">
                Thông tin tài khoản
              </h2>
              <div className="flex justify-between pb-2">
                <span className="w-4/12 font-semibold">Họ và đệm</span>
                <span className="w-8/12">{item.last_name}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="w-4/12 font-semibold">Tên</span>
                <span className="w-8/12">{item.first_name}</span>
              </div>

              <div className="flex justify-between pb-2">
                <span className="w-4/12 font-semibold">Số điện thoại</span>
                <span className="w-8/12">{item.phone}</span>
              </div>

              <div className="flex justify-between pb-2">
                <span className="w-4/12 font-semibold">Ngày sinh:</span>
                <span className="w-8/12">{item.dob || "Chưa cập nhật"}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="w-4/12 font-semibold">Giới tính:</span>
                <span className="w-8/12">
                  {item.gender === 1
                    ? "Nam"
                    : item.gender === 2
                      ? "Nữ"
                      : "Chưa xác định"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Địa chỉ:</span>
                <span className="w-8/12">
                  {item.address || "Chưa cập nhật"}
                </span>
              </div>

              <div className="flex justify-between pb-2">
                <span className="w-4/12 font-semibold">Trạng thái</span>

                {item.account_lock === 1 ? (
                  <span className="w-8/12 text-green-500">Đang hoạt động</span>
                ) : (
                  <span className="w-8/12 text-red-500">Đã khóa</span>
                )}
              </div>
              <div className="flex justify-between pb-2">
                <span className="w-4/12 font-semibold">Ngày tạo</span>
                <span className="w-8/12">
                  {item.email_verified_at
                    ? formatDateTime(item.email_verified_at)
                    : "Chưa cập nhật"}
                </span>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
