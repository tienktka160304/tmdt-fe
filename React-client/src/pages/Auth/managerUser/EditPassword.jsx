import { useState } from "react";
import { changePassword } from "../../../api/user";
import BtnAnimation from "../../../component/shared/BtnAnimation";

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (formData.new_password !== formData.new_password_confirmation) {
  //     setMessage(`Mật khẩu nhập lại không khớp!!`);
  //     return false;
  //   }
  //   const result = await changePassword(formData);
  //   if (!result.success) {
  //     setMessage(result.message);
  //   } else {
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Xóa message cũ trước khi kiểm tra
    setMessage("");

    if (formData.new_password !== formData.new_password_confirmation) {
      setMessage(`Mật khẩu nhập lại không khớp!!`);
      return;
    }

    const result = await changePassword(formData);

    if (!result.success) {
      setMessage(result.message);
    } else {
      // 1. Thông báo thành công
      setMessage("Đổi mật khẩu thành công!");

      // 2. Reset lại form (làm trống các input)
      setFormData({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      });

      // (Tùy chọn) Tự động xóa thông báo sau 3 giây
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div data-aos="zoom-in" data-aos-delay="400" className="px-6">
      <h2 className="pb-8 text-xl font-medium">Đổi Mật Khẩu</h2>
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-96 flex-col items-center rounded-md bg-gray-100/55 px-4 py-8 shadow"
      >
        <p>
          <label htmlFor="" className="mb-1 mt-3 block font-medium">
            Mật khẩu hiện tại
          </label>
          <input
            type="password"
            name="current_password"
            placeholder="Mật khẩu hiện tại"
            onChange={handleChange}
            className="w-64 rounded border px-4 py-1"
            required
          />
        </p>

        <p>
          <label htmlFor="" className="mb-1 mt-3 block font-medium">
            Mật khẩu mới
          </label>
          <input
            type="password"
            name="new_password"
            placeholder="Mật khẩu mới"
            onChange={handleChange}
            className="w-64 rounded border px-4 py-1"
            required
          />
        </p>

        <p>
          <label htmlFor="" className="mb-1 mt-3 block font-medium">
            Nhập lại mật khẩu mới
          </label>
          <input
            type="password"
            name="new_password_confirmation"
            placeholder="Nhập lại mật khẩu mới"
            onChange={handleChange}
            className="w-64 rounded border px-4 py-1"
            required
          />
        </p>
        {/* <div className="h-5">
          {message && <p className="pt-1 text-sm text-red-400">{message}</p>}
        </div> */}
        <div className="h-5">
          {message && (
            <p
              className={`pt-1 text-sm ${
                message.includes("thành công")
                  ? "text-green-600"
                  : "text-red-400"
              }`}
            >
              {message}
            </p>
          )}
        </div>

        <div>
          <BtnAnimation>
            <button
              type="submit"
              className="mx-auto ml-4 mt-4 rounded-md bg-primary px-8 py-2 font-semibold text-white hover:bg-black"
            >
              Đổi mật khẩu
            </button>
          </BtnAnimation>
        </div>
      </form>
    </div>
  );
}
