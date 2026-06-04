import { FaPhoneVolume } from "react-icons/fa";
import HeaderNav from "./HeaderNav";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosMail, IoIosSearch } from "react-icons/io";
import { useEffect, useState } from "react";
import { fetchsearch } from "../../api/http";

export default function Header() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length <= 2) {
      setShowSuggestions(false);
      return;
    }

    setLoading(true);
    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      try {
        const response = await fetchsearch(query, 4);
        setSuggestions(response.data.data);
        setTotal(response.data.total);
        setShowSuggestions(true);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("❌ Error fetching products:", error);
        }
      } finally {
        setLoading(false);
      }
    }, 500); // Thêm debounce 500ms

    return () => {
      clearTimeout(timeout); // Hủy debounce nếu user tiếp tục nhập
      controller.abort(); // Hủy request trước đó nếu query thay đổi
    };
  }, [query]);
  // Xử lý gửi form tìm kiếm
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    if (query.length >= 1) {
      navigate(`/search?query=${encodeURIComponent(query)}`); // Chuyển hướng đến trang tìm kiếm
    }
  };

  return (
    <>
      <header>
        <section className="">
          <div className="container">
            <div className="relative flex h-[80px] items-center justify-between space-x-2 lg:space-x-5">
              <h1 className="md:mr-1">
                <NavLink to="/">
                  <img
                    src={import.meta.env.VITE_APP_LOGO}
                    className="w-20"
                    alt="3s TMDT"
                    title="Trang chủ TMDT"
                  />
                </NavLink>
              </h1>

              <div className="hidden items-center space-x-2 text-sm xl:flex">
                <div className="hidden items-center space-x-2 text-sm md:flex">
                  <p>
                    <FaPhoneVolume className="animated-swing-fast inline-block text-xl" />
                  </p>
                  <p>
                    <span className="mr-2">Hotline:</span>
                    <br className="block xl:hidden" />
                    <span>{import.meta.env.VITE_APP_PHONE}</span>
                  </p>
                </div>
                <div className="hidden items-center space-x-2 text-sm md:flex">
                  <p>
                    <IoIosMail className="inline-block text-xl" />
                  </p>
                  <p>
                    <span className="mr-2">Email:</span>
                    <br className="block xl:hidden" />
                    <span>{import.meta.env.VITE_APP_EMAIL}</span>
                  </p>
                </div>
              </div>

              <form
                action=""
                className="group relative"
                onSubmit={handleSearchSubmit}
              >
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Nhập sản phẩm tìm kiếm ..."
                  className="w-64 rounded border border-gray-300 px-1 py-2 text-xs sm:w-80 sm:px-3 md:w-[320px] md:text-base lg:w-[450px] lg:px-5 xl:w-[500px]"
                />
                <button className="absolute right-0 top-1/2 h-full -translate-y-1/2 rounded-e bg-primary px-2 text-white sm:px-3 lg:px-5">
                  <IoIosSearch className="text-xl md:text-2xl lg:text-3xl" />
                </button>
                {showSuggestions && (
                  <ul className="absolute left-0 top-10 z-50 mt-2 hidden w-full rounded-sm bg-gray-100 shadow before:absolute before:-top-[15px] before:right-0 before:h-10 before:w-full before:bg-transparent before:content-[''] group-hover:block">
                    <li className="bg-gray-200 p-2 text-center text-sm font-medium">
                      Sản phẩm gợi ý
                    </li>
                    {suggestions.map((item) => (
                      <li
                        key={item.id}
                        className="flex gap-2 border-b border-primary/20 p-2 text-sm"
                      >
                        <div>
                          <img
                            src={`${import.meta.env.VITE_ENDPOINT}${item.product_variants[0].image}`}
                            alt=""
                            className="w-24"
                          />
                        </div>
                        <div className="flex flex-col justify-around">
                          <NavLink
                            to={`/chi-tiet?sp=${item.slug}`}
                            className="line-clamp-2 text-xs font-medium lg:text-base"
                          >
                            {item.name}
                          </NavLink>
                          <p className="text-red-500">
                            {Number(
                              item.product_variants[0].price,
                            ).toLocaleString()}
                            đ
                          </p>
                        </div>
                      </li>
                    ))}
                    <li className="bg-gray-200 py-1 text-center text-xs">
                      Có {total} kết quả tìm kiếm
                    </li>
                  </ul>
                )}
              </form>
            </div>
          </div>
        </section>
      </header>
      <section className="sticky top-0 z-30 w-full bg-primary shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
        <HeaderNav />
      </section>
    </>
  );
}
