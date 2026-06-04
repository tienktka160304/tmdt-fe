import { useState } from "react";
import { postReviewWeb } from "../../../api/user";
import { getUser } from "../../../util/auth";
import Swal from "sweetalert2";
import BtnAnimation from "../../../component/shared/BtnAnimation";

export default function DanhGiaWeb() {
  const [content, setcontent] = useState("");
  const user = getUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id_user = user.id;

    const data = { content, id_user };
    const res = await postReviewWeb(data);

    if (res.success) {
      Swal.fire({
        icon: "success",
        title: "Đánh giá thành công!",
        showConfirmButton: false,
        timer: 1500,
      });
      setcontent("");
      return;
    } else {
      Swal.fire({
        icon: "error",
        title: "Đánh giá thất bại!",
        text: res.message,
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
  };

  return (
    <div data-aos="zoom-in" data-aos-delay="400">
      <h2 className="pb-4 text-xl font-medium">
        Đánh giá website của chúng tôi
      </h2>
      <form onSubmit={handleSubmit} className="mx-auto max-w-[720px] space-y-4">
        <textarea
          placeholder="Cảm nhận của bạn..."
          className="min-h-32 w-full border p-2"
          value={content}
          onChange={(e) => setcontent(e.target.value)}
          required
        />
        <BtnAnimation>
          <button
            type="submit"
            className="rounded bg-primary px-4 py-2 text-white"
          >
            Gửi đánh giá
          </button>
        </BtnAnimation>
      </form>
    </div>
  );
}
