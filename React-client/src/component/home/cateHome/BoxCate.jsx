import { NavLink } from "react-router-dom";

function BoxCate({ item, dataaos, delay }) {
  return (
    <div>
      <NavLink
        data-aos={dataaos}
        data-aos-delay="200"
        to={`/san-pham?category=${item.slug}`}
        className="clip-hover group inline-block"
      >
        <div className="clip hover-child h-[140px] w-[140px] bg-[#eee] duration-500 hover:bg-[#dcdcdc] sm:h-[150px] sm:w-[150px] lg:h-[160px] lg:w-[160px] xl:h-[190px] xl:w-[190px]">
          <img
            src={import.meta.env.VITE_ENDPOINT + item.image}
            className="h-full w-full transform object-contain p-5 duration-300 group-hover:scale-110"
            alt={item.name}
          />
        </div>
        <div className="relative h-[40px]">
          <p className="text-center text-sm font-semibold">{item.name}</p>
          <p className="absolute bottom-1 left-1/2 -translate-x-1/2 text-center text-xs text-gray-400 duration-300 group-hover:hidden">
            {item.products_count} sản phẩm
          </p>
          <p className="invisible absolute -bottom-3 left-1/2 -translate-x-1/2 text-center text-xs text-black underline duration-500 group-hover:visible group-hover:bottom-1 group-hover:block">
            Xem chi tiết
          </p>
        </div>
      </NavLink>
    </div>
  );
}

export default BoxCate;
