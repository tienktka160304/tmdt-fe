import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import Swal from "sweetalert2";
import { popupAuthAction } from "../../store";
import { useDispatch } from "react-redux";
import { getUser } from "../../util/auth";
import { fetchComment, pulishComment } from "../../api/detail-product";
import { checkToken } from "../../api/user";

export default function BinhLuan({ id }) {
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const response = await fetchComment(id);
        setComment(response);
      } catch (error) {
        console.error("❌❌❌ Error fetching commet:", error);
      }
      setLoading(false);
    }
    fetchProduct();
  }, []);

  const hanldeBinhLuan = async (e) => {
    e.preventDefault();
    const { valid } = await checkToken();

    if (!valid) {
      Swal.fire({
        title: "Đăng Nhập",
        text: "Bạn có muốn Đăng nhập để bình luận?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Có, đăng nhập",
        cancelButtonText: "Không",
        confirmButtonColor: "#0a402b",
        cancelButtonColor: "black",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(popupAuthAction.SHOW_POPUP());
          return;
        }
      });
    } else {
      // // cach 1
      // const form = e.target;
      // const data = {
      //   comment: form.comment.value,
      //   // email: form.email.value,
      //   // password: form.password.value,
      // };
      // console.log("Dữ liệu form:", data);

      // Cach 2
      // Lấy dữ liệu form bằng FormData
      const user = getUser();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      const commnetData = {
        id_user: user.id,
        id_product: id,
        content: data.comment,
      };

      if (data.comment !== "") {
        const responsive = await pulishComment(commnetData);
        if (responsive.status == "success") {
          Swal.fire({
            icon: "success",
            title: "Bình luận đã được đăng",
            showConfirmButton: false,
            timer: 1500,
          }).then((t) => window.location.reload());
        } else {
          alert(`Bình luận thất bại!`);
        }
      } else {
        Swal.fire({
          icon: "warning",
          title: "Vui lòng nhập nội dung",
          showConfirmButton: false,
          timer: 1500,
        });

        return;
      }
      return;
    }
  };

  return (
    <>
      <section className="container py-6">
        <header className="ml-3 gap-x-4 pb-5">
          <h2 className="text-base font-bold leading-loose text-primary sm:text-lg md:text-xl lg:text-2xl">
            BÌNH LUẬN SẢN PHẨM
          </h2>
        </header>
        <Form onSubmit={hanldeBinhLuan}>
          <textarea
            name="comment"
            id=""
            placeholder="Hãy viết điều gì đó..."
            className="text-md placeholder:text-gray-60 inline-block w-full resize-none overflow-auto rounded-md border-none bg-gray-100 p-5 text-black shadow"
          ></textarea>
          <div className="py-4 text-right">
            <button
              type="submit"
              className="rounded-md bg-primary px-6 py-2 text-lg text-white shadow duration-300 hover:scale-110 active:scale-95"
            >
              Gửi
            </button>
          </div>
        </Form>
        <hr />
        <div className="py-10">
          {!loading && comment.length > 0 ? (
            comment.map((item) => (
              <div className="flex" key={item.id}>
                <div className="w-20 pt-5">
                  <img
                    src={` ${item.user?.avatar ? import.meta.env.VITE_ENDPOINT + item.user?.avatar : "18.png"}`}
                    alt="avater"
                    onError={(e) => {
                      e.target.src = "18.png";
                    }}
                    className="h-14 w-14 overflow-hidden rounded-full object-cover shadow"
                  />
                </div>
                <div className="ml-2 w-full">
                  <div className="rounded-md border px-6 py-4">
                    <h5 className="border-b border-black py-2 text-base font-bold">
                      {item.user?.last_name} {item.user?.first_name}
                    </h5>
                    <p className="py-2">{item.content}</p>
                  </div>
                  <p className="py-2 text-gray-400">
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="">Hãy là người đầu tiên bình luận cho sản phẩm này</p>
          )}
        </div>
      </section>
    </>
  );
}
