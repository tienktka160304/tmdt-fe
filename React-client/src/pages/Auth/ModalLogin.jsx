import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { popupAuthAction, cartAction } from "../../store";
import { NavLink, useFetcher, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import BtnLoadingSubmit from "../../component/shared/BtnLoadingSubmit";
import "react-toastify/dist/ReactToastify.css";

export default function ModalLogin(params) {
  const dispatch = useDispatch();
  const [login, setLogin] = useState("login");
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const isPending = fetcher.state === "submitting";

  function dispatchHandlePopUpAuth() {
    dispatch(popupAuthAction.HIDDEN_POPUP());
  }

  // --- PHẦN QUAN TRỌNG: XỬ LÝ THÔNG BÁO & LOGIC SAU KHI SERVER TRẢ VỀ ---
  useEffect(() => {
    // 1. Kiểm tra nếu có dữ liệu trả về từ Server
    if (!fetcher.data) return;

    // 2. Xử lý Lỗi (Error)
    // Trường hợp A: Lỗi trả về dạng text đơn (ví dụ: "Sai mật khẩu")
    if (fetcher.data.error) {
      toast.error(fetcher.data.error);
    }

    // Trường hợp B: Lỗi Validation từ Laravel (ví dụ: "Email đã tồn tại", "Mật khẩu quá ngắn")
    if (fetcher.data.errors) {
      const errorMessages = Object.values(fetcher.data.errors).flat();
      errorMessages.forEach((msg) => toast.error(msg));
    }

    // 3. Xử lý Thành công (Success)
    if (fetcher.data.success === true) {
      // Xác định thông báo dựa trên mode (login hay signup)
      if (fetcher.data.mode === "login") {
        dispatch(cartAction.LOAD_CART());
      }
      let message = fetcher.data.message;
      if (!message) {
        message =
          fetcher.data.mode === "signup"
            ? "Đăng ký thành công! Đang vào hệ thống..."
            : "Đăng nhập thành công!";
      }

      toast.success(message);

      // --- LOGIC MỚI: TỰ ĐỘNG RELOAD CHO CẢ LOGIN VÀ SIGNUP ---
      // Vì backend đã Auth::login($user) ngay sau khi đăng ký,
      // nên ta reload trang để React nhận diện session người dùng mới.
      setTimeout(() => {
        dispatchHandlePopUpAuth(); // Đóng popup
        window.location.reload(); // Tải lại trang
      }, 1000);
    }
  }, [fetcher.data]);
  // ----------------------------------------

  function hanldeForgotPassword() {
    dispatchHandlePopUpAuth();
    navigate("/forgot-pass");
  }

  return (
    <>
      <div
        onClick={dispatchHandlePopUpAuth}
        className={`fixed top-0 z-40 block h-full w-full bg-black/40 backdrop-blur-sm duration-500`}
      ></div>

      <aside
        className={`fixed left-1/2 top-1/2 z-50 block -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-2 shadow-[0_0_10px_rgba(204,204,204,0.4)] transition-all duration-1000`}
      >
        <div className={`min-w-72 max-w-[550px] rounded-md transition-all`}>
          <div className="px-2 text-right" onClick={dispatchHandlePopUpAuth}>
            <CgClose className="inline-block cursor-pointer text-xl" />
          </div>

          <div className="flex items-center justify-center border-b">
            <span
              className={`w-6/12 border-r py-2 text-center text-base text-black/40 ${
                login === "login"
                  ? "relative font-medium text-primary before:absolute before:bottom-[-1px] before:left-[30px] before:right-[30px] before:h-[2px] before:bg-[#0a402b] before:content-['']"
                  : ""
              }`}
            >
              <button onClick={() => setLogin("login")}>Đăng Nhập</button>
            </span>

            <span
              className={`w-6/12 py-2 text-center text-base text-black/40 ${
                login === "signup"
                  ? "relative font-medium text-primary before:absolute before:bottom-[-1px] before:left-[30px] before:right-[30px] before:h-[2px] before:bg-[#0a402b] before:content-['']"
                  : ""
              }`}
            >
              <button onClick={() => setLogin("signup")}>Đăng ký</button>
            </span>
          </div>

          {/* --- FORM ĐĂNG NHẬP --- */}
          {login === "login" ? (
            <fetcher.Form method="post" action="/auth">
              <input type="hidden" name="mode" value="login" />
              <div className="px-4 py-2 sm:px-5 sm:py-4 md:px-10">
                <p className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-semibold text-gray-900"
                  >
                    Email address
                  </label>
                  <input
                    className="shadow-xs focus:outline-hidden mt-1 block h-10 w-full appearance-none rounded-md bg-white px-3 text-xs text-slate-900 ring-1 ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 sm:text-sm"
                    name="email"
                    type="email"
                    id="email"
                    placeholder="Nhập Địa chỉ Email"
                    required
                  />
                </p>

                <p className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-semibold text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    className="shadow-xs focus:outline-hidden mt-1 block h-10 w-full appearance-none rounded-md bg-white px-3 text-xs text-slate-900 ring-1 ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 sm:text-sm"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Nhập Mật khẩu"
                    required
                  />
                </p>
                <p className="mb-2 ml-2">
                  <span
                    onClick={() => alert("Chức năng đang phát triển")}
                    className="cursor-pointer text-xs font-medium text-blue-600 hover:underline"
                  >
                    Quên mật khẩu ?
                  </span>
                </p>

                <BtnLoadingSubmit
                  isPending={isPending}
                  typebtn="submit"
                  defaultText="Đăng nhập"
                  loadingText="Đang xử lý"
                />

                <p className="ml-auto mr-auto text-center text-xs font-light text-black/65">
                  Chúng tôi cam kết bảo mật và sẽ không bao giờ đăng <br></br>
                  hay chia sẻ thông tin mà chưa có được sự đồng ý của bạn.
                </p>
              </div>

              <div className="relative">
                <hr />
                <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border bg-white px-1 py-0.5 text-xs text-black/60 sm:px-4">
                  hoặc đăng nhập qua
                </div>
              </div>
              <div className="my-6 flex justify-center gap-2">
                <a href="http://localhost:8000/auth/facebook/redirect">
                  <img
                    src="/logo/facebook.png"
                    alt="Facebook"
                    className="w-36"
                  />
                </a>
                <a href="http://localhost:8000/auth/google/redirect">
                  <img src="/logo/google.png" alt="Google" className="w-36" />
                </a>
              </div>
            </fetcher.Form>
          ) : (
            /* --- FORM ĐĂNG KÝ --- */
            <fetcher.Form method="post" action="/auth">
              <input type="hidden" name="mode" value="signup" />
              <div className="px-4 py-2 sm:px-5 sm:py-4 md:px-10">
                <div className="mb-2 flex justify-between gap-4 md:mb-4">
                  <p>
                    <label
                      htmlFor="last_name"
                      className="block text-sm/6 font-semibold text-gray-900"
                    >
                      Họ
                    </label>
                    <input
                      className="shadow-xs focus:outline-hidden mt-1 block h-10 w-full appearance-none rounded-md bg-white px-3 text-xs text-slate-900 ring-1 ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 sm:text-sm"
                      name="last_name"
                      type="text"
                      id="last_name"
                      placeholder="Nhập Họ"
                      required
                    />
                  </p>

                  <p>
                    <label
                      htmlFor="first_name"
                      className="block text-sm/6 font-semibold text-gray-900"
                    >
                      Tên
                    </label>
                    <input
                      className="shadow-xs focus:outline-hidden mt-1 block h-10 w-full appearance-none rounded-md bg-white px-3 text-xs text-slate-900 ring-1 ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 sm:text-sm"
                      name="first_name"
                      type="text"
                      id="first_name"
                      placeholder="Nhập Tên"
                      required
                    />
                  </p>
                </div>
                <p className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-sm/6 font-semibold text-gray-900"
                  >
                    Số điện thoại
                  </label>

                  <input
                    className="shadow-xs focus:outline-hidden mt-1 block h-10 w-full appearance-none rounded-md bg-white px-3 text-xs text-slate-900 ring-1 ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 sm:text-sm"
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="Nhập số điện thoại"
                    pattern="[0-9]{10,11}"
                    required
                  />
                </p>

                <p className="mb-4">
                  <label
                    htmlFor="email_signup"
                    className="block text-sm/6 font-semibold text-gray-900"
                  >
                    Email address
                  </label>
                  <input
                    className="shadow-xs focus:outline-hidden mt-1 block h-10 w-full appearance-none rounded-md bg-white px-3 text-xs text-slate-900 ring-1 ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 sm:text-sm"
                    name="email"
                    type="email"
                    id="email_signup"
                    placeholder="Nhập Địa chỉ Email"
                    required
                  />
                </p>

                <p className="mb-4">
                  <label
                    htmlFor="password_signup"
                    className="block text-sm/6 font-semibold text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    className="shadow-xs focus:outline-hidden mt-1 block h-10 w-full appearance-none rounded-md bg-white px-3 text-xs text-slate-900 ring-1 ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 sm:text-sm"
                    type="password"
                    name="password"
                    id="password_signup"
                    placeholder="Nhập Mật khẩu"
                    required
                  />
                </p>
                <BtnLoadingSubmit
                  isPending={isPending}
                  typebtn="submit"
                  defaultText="Đăng ký"
                  loadingText="Đang xử lý"
                />

                <p className="ml-auto mr-auto text-center text-xs font-light text-black/65">
                  Chúng tôi cam kết bảo mật và sẽ không bao giờ đăng <br></br>{" "}
                  hay chia sẻ thông tin mà chưa có được sự đồng ý của bạn.
                </p>
              </div>

              <div className="relative">
                <hr />
                <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border bg-white px-1 py-0.5 text-xs text-black/60 sm:px-4">
                  hoặc đăng nhập qua
                </div>
              </div>
              <div className="my-6 flex justify-center gap-2">
                <a href="http://localhost:8000/auth/facebook/redirect">
                  <img
                    src="/logo/facebook.png"
                    alt="Facebook"
                    className="w-36"
                  />
                </a>
                <a href="http://localhost:8000/auth/google/redirect">
                  <img src="/logo/google.png" alt="Google" className="w-36" />
                </a>
              </div>
            </fetcher.Form>
          )}
        </div>
      </aside>
      <ToastContainer
        autoClose={3000}
        hideProgressBar={false}
        theme="colored"
      />
    </>
  );
}
