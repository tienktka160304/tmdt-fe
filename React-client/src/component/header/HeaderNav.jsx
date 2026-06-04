import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { popupAuthAction } from "../../store";
import { getToken, getUser, removeTokenUser } from "../../util/auth";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaCartArrowDown, FaHeart } from "react-icons/fa6";
import { TiThMenuOutline } from "react-icons/ti";
import { createPortal } from "react-dom";
import { CgClose } from "react-icons/cg";
import { checkToken, fetchLogout } from "../../api/user";
import BtnAnimation from "../shared/BtnAnimation";

const navList = [
  { id: 1, title: "Trang chủ", link: "/", exact: true },
  { id: 2, title: "Giới Thiệu", link: "/gioi-thieu" },
  { id: 3, title: "Liên hệ", link: "/lien-he" },
  { id: 4, title: "Sản phẩm", link: "/san-pham" },
  { id: 5, title: "Tin Tức", link: "/tin-tuc" },
];

export default function HeaderNav() {
  const dispatch = useDispatch();
  const isCart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const token = getToken();
  const user = getUser();
  const [menuMobi, setMenuMobi] = useState(true);

  function dispatchHandle() {
    dispatch(popupAuthAction.SHOW_POPUP());
  }

  function hanldeNavigateHistory() {
    navigate("/lich-su-mua-hang");
  }

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
        }
      });
    } else {
      removeTokenUser();
      navigate("/");
    }
  }

  async function managerUser() {
    navigate("/manager-user");
  }

  function handlePageLike() {
    if (!token) {
      Swal.fire({
        title: "Đăng nhập",
        text: "Bạn có muốn đăng nhập để xem trang này ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Có, đăng nhập",
        cancelButtonText: "Không",
        confirmButtonColor: "#0a402b",
        cancelButtonColor: "black",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatchHandle();
        }
      });
    } else {
      navigate("/yeu-thich");
    }
  }

  function menu() {
    return createPortal(
      <>
        <div
          onClick={() => setMenuMobi(true)}
          className={`fixed top-0 z-40 block h-full w-full bg-black/40 duration-500 xl:hidden ${menuMobi ? "-left-full" : ""}`}
        ></div>

        <aside
          className={`fixed top-0 z-50 block h-full w-64 overflow-auto bg-white transition-all duration-1000 xl:hidden ${menuMobi ? "-left-full" : "left-0"}`}
        >
          <div className="px-2 py-1 text-right">
            <CgClose
              className="inline-block text-xl"
              onClick={() => setMenuMobi(true)}
            />
          </div>

          <div className="">
            <ul className="flex flex-col gap-x-0 px-4 text-sm font-medium xl:gap-x-2 xl:text-base xl:font-semibold">
              {navList.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.link}
                    className={({ isActive }) =>
                      `block px-3 py-3 ${isActive ? "rounded-md bg-secondary font-semibold" : ""}`
                    }
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}

              <NavLink to="" className="flex justify-center py-4">
                <img src="/flash.webp" className="w-24" alt="" />
              </NavLink>
            </ul>
          </div>
        </aside>
      </>,
      document.getElementById("menu"),
    );
  }

  return (
    <>
      <div>
        <img src="/header-footer-gradient-bg.png" width="100%" alt="" />
      </div>
      <div className="container flex items-center justify-between">
        <>
          <nav className="hidden lg:inline-block">
            <ul className="flex items-center gap-x-0 text-sm font-medium text-white xl:gap-x-2 xl:text-base xl:font-semibold">
              {navList.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.link}
                    className={({ isActive }) =>
                      `inline-block px-3 py-3 transition-colors duration-1000 ease-in-out hover:text-green-200 ${isActive ? "bg-secondary text-green-200" : ""}`
                    }
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}

              {/* <NavLink
                to="/san-pham?ct=discount-value"
                className="origin-top animate-swing"
              >
                <img src="/flash.webp" className="w-24" alt="" />
              </NavLink> */}
              <a href="/#flashsale" className="origin-top animate-swing">
                <img src="/flash.webp" className="w-24" alt="" />
              </a>
            </ul>
          </nav>

          {/* mobile */}
          <div className="p-1 lg:hidden">
            <button
              onClick={() => setMenuMobi(false)}
              className="flex items-center justify-center rounded-md border-2 p-1 text-2xl text-green-50 shadow"
            >
              <TiThMenuOutline className="inline-block" />
            </button>
          </div>
        </>
        <div className="flex-grow"></div>
        {/*  */}
        <div>
          <ul className="flex items-center justify-center gap-4 text-green-50">
            <li>
              <BtnAnimation>
                <button onClick={handlePageLike} title="Sản phẩm yêu thích">
                  <FaHeart className="text-2xl xl:text-3xl" />
                </button>
              </BtnAnimation>
            </li>
            <li title="Giỏ hàng của bạn">
              <BtnAnimation>
                <NavLink to={"/cart"} className="relative">
                  <FaCartArrowDown className="text-2xl xl:text-3xl" />
                  <span className="absolute -right-1 -top-1 flex h-[22px] w-[22px] -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-green-400 text-xs font-semibold shadow">
                    {isCart.length}
                  </span>
                </NavLink>
              </BtnAnimation>
            </li>
            {/*  */}
            <li className="group relative">
              <button className="py-1">
                {!token ? (
                  <>
                    <FaRegUserCircle className="text-2xl xl:text-3xl" />
                  </>
                ) : (
                  <>
                    <img
                      className="h-9 w-9 rounded-full border"
                      src={` ${user?.avatar ? import.meta.env.VITE_ENDPOINT + user?.avatar : "/18.png"}`}
                      alt=""
                    />
                  </>
                )}
              </button>

              <ul className="absolute right-0 top-full z-50 hidden w-44 translate-y-3 rounded-lg bg-gray-50 p-2 text-black shadow-md before:absolute before:-top-[15px] before:right-0 before:h-5 before:w-36 before:bg-transparent before:content-[''] group-hover:block">
                {!token ? (
                  <li>
                    <button
                      onClick={dispatchHandle}
                      className="w-full py-2 hover:bg-gray-200"
                    >
                      Đăng nhập
                    </button>
                  </li>
                ) : (
                  <>
                    <li>
                      <button
                        onClick={managerUser}
                        className="w-full py-2 hover:bg-gray-200"
                      >
                        Quản lý tài khoản
                      </button>
                    </li>

                    <li>
                      <button
                        onClick={hanldeNavigateHistory}
                        className="w-full py-2 hover:bg-gray-200"
                      >
                        Lịch sử mua hàng
                      </button>
                    </li>

                    <li>
                      <button
                        onClick={Logout}
                        className="w-full py-2 hover:bg-gray-200"
                      >
                        Đăng xuất
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>

      {menu()}
    </>
  );
}
