import { NavLink } from "react-router-dom";

const itemsInfo = [
  { name: "Giới thiệu", link: "/gioi-thieu" },
  { name: "Liên hệ", link: "/lien-he" },
  { name: "Bài viết", link: "/tin-tuc" },
];

const itemsSupport = [
  { name: "Hướng dẫn mua hàng", link: "/gioi-thieu" },
  { name: "Chính sách đổi trả và hoàn tiền", link: "/gioi-thieu" },
  { name: "Thời gian giao hàng", link: "/gioi-thieu" },
  { name: "Phí vận chuyển", link: "/gioi-thieu" },
];

const itemsProducts = [
  { name: "TMDT Thể Thao", link: "#" },
  { name: "TMDT Phổ Thông", link: "#" },
  { name: "TMDT Trẻ Em", link: "#" },
  { name: "Phụ Kiện", link: "#" },
];

export default function TopFooter() {
  return (
    <>
      <div className="grid grid-cols-1 font-medium text-primary first-letter:uppercase sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="flex flex-col items-center justify-center pb-6">
          <NavLink to="/">
            <img
              src={import.meta.env.VITE_APP_LOGO}
              alt=""
              className="w-32 md:w-44"
            />
          </NavLink>
        </div>

        <div className="pb-4">
          <h4 className="text-md font-semibold text-black">Thông tin</h4>
          <ul className="pl-1 pt-2 text-sm sm:text-base/8">
            {itemsInfo.map((item, index) => (
              <li key={index}>
                <NavLink to={item.link} className="">
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="pb-4">
          <h4 className="text-md font-semibold text-black">Hổ trợ</h4>
          <ul className="pl-1 pt-2 text-sm sm:text-base/8">
            {itemsSupport.map((item, index) => (
              <li key={index}>
                <NavLink to={item.link} className="">
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="pb-4">
          <h4 className="text-md font-semibold text-black">Sản phẩm</h4>
          <ul className="pl-1 pt-2 text-sm sm:text-base/8">
            {itemsProducts.map((item, index) => (
              <li key={index}>
                <NavLink to={item.link} className="">
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
