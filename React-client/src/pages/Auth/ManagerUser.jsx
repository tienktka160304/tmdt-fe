import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { getToken, getUser, removeTokenUser } from "../../util/auth";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { checkToken, fetchLogout } from "../../api/user";

export default function ManagerUser(params) {
  const navigate = useNavigate();
  const Token = getToken();
  const user = getUser();

  useEffect(() => {
    async function kt() {
      const { valid } = await checkToken();
      if (!valid) {
        navigate("/");
      }
    }

    if (!Token) {
      navigate("/");
      return;
    } else {
      kt();
    }
  }, [Token]);

  async function Logout() {
    const { valid } = await checkToken();
    if (valid) {
      Swal.fire({
        title: "Đăng Xuất",
        text: "Bạn có muốn Đăng Xuất tài khoản?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Có, đăng xuất",
        cancelButtonText: "Không",
        confirmButtonColor: "#0a402b",
        cancelButtonColor: "black",
      }).then((result) => {
        if (result.isConfirmed) {
          fetchLogout();
          return;
        }
      });
    } else {
      removeTokenUser();
      navigate("/");
      return;
    }
  }

  const getLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-500 transition";
  useEffect(() => {
    document.title = `Quản lý tài khoản | ${import.meta.env.VITE_WEBSITE_NAME}`;
  }, []);

  return (
    <>
      <main className="bg-greenwhite">
        <section className="container py-4">
          <div className="flex flex-col gap-12 p-6 sm:flex-row">
            <div
              data-aos="fade-right"
              data-aos-delay="400"
              className="w-full sm:w-3/12"
            >
              <div className="rounded bg-white px-10 py-8 shadow">
                <div className="flex flex-col items-center justify-between">
                  <h1 className="mb-2 text-2xl font-bold uppercase">
                    tài khoản
                  </h1>
                  <p className="text-sm font-medium text-gray-600">
                    Xin chào {user.first_name}
                  </p>
                </div>
                <ul className="space-y-4 py-3 text-base">
                  <li className="mb-2">
                    <NavLink to={"/manager-user/"} end className={getLinkClass}>
                      Thông tin tài khoản
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to={"/manager-user/edit-accout"}
                      className={getLinkClass}
                    >
                      Chỉnh sửa thông tin
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to={"/manager-user/danh-gia"}
                      className={getLinkClass}
                    >
                      Đánh giá website
                    </NavLink>
                  </li>
                  <li>
                    <button onClick={Logout} className="hover:bg-gray-200">
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full rounded bg-white p-8 sm:w-8/12">
              <Outlet />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
