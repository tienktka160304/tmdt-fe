import { NavLink } from "react-router-dom";

export default function BoxBrand({ item, delay, dataaos }) {
  // 1. Lấy Endpoint từ biến môi trường (ví dụ: http://127.0.0.1:8000)
  const baseURL = import.meta.env.VITE_ENDPOINT || "";

  // 2. Xử lý đường dẫn ảnh an toàn:
  // - baseURL.replace(/\/$/, ""): Xóa dấu / ở cuối endpoint nếu có.
  // - item.logo.replace(/^\//, ""): Xóa dấu / ở đầu logo nếu có.
  // - Nối lại bằng một dấu / ở giữa duy nhất.
  const fullImageUrl = item.logo?.startsWith("http")
    ? item.logo
    : `${baseURL.replace(/\/$/, "")}/${item.logo?.replace(/^\//, "")}`;

  return (
    <div
      data-aos={dataaos}
      data-aos-delay="200"
      className="flex justify-center py-4 md:py-8"
    >
      <NavLink to={"/san-pham?brand=" + item.slug}>
        <img
          src={fullImageUrl}
          className="w-28 h-auto object-contain"
          alt={item.name}
          // Thêm onError để xử lý khi ảnh thật sự bị thiếu hoặc sai đường dẫn
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/150?text=No+Image";
          }}
        />
      </NavLink>
    </div>
  );
}