import { useState } from "react";
import Card from "../../component/shared/Card";
import { forgotPass } from "../../api/user";
import Swal from "sweetalert2";
import BtnLoadingSubmit from "../../component/shared/BtnLoadingSubmit";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      Swal.fire({
        title: "Vui lòng nhập email",
        icon: "error",
        draggable: true,
        confirmButtonText: "Đóng",
        buttonsStyling: false,
        customClass: {
          confirmButton: "bg-red-400 text-white rounded-lg px-4 py-2",
        },
      });
      return;
    }

    setIsLoading(true);
    const result = await forgotPass(email);
    setIsLoading(false);

    if (result.success) {
      Swal.fire({
        title: "Kiểm tra email xác thực!",
        icon: "success",
        draggable: true,
        confirmButtonText: "Đóng",
        buttonsStyling: false,
        customClass: {
          confirmButton: "bg-primary text-white rounded-lg px-4 py-2",
        },
      });
    } else {
      Swal.fire({
        title: "Đã gửi email!",
        icon: "error",
        draggable: true,
        confirmButtonText: "Đóng",
        buttonsStyling: false,
        customClass: {
          confirmButton: "bg-red-400 text-white rounded-lg px-4 py-2",
        },
      });
    }
  };

  return (
    <Card>
      <div className="mx-auto my-20 max-w-md rounded bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-bold">Quên mật khẩu</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            className="w-full rounded border p-2"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <BtnLoadingSubmit
            isPending={isLoading}
            typebtn="submit"
            defaultText="Gửi yêu cầu"
            loadingText="Đang gửi"
          ></BtnLoadingSubmit>
        </form>
      </div>
    </Card>
  );
}
