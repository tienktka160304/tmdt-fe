import { NavLink } from "react-router-dom";

export default function CardNews({ item, delay, dataaos }) {
  return (
    <div
      data-aos={dataaos}
      data-aos-delay={(200 * delay) % 1600}
      className="block rounded bg-white text-left shadow-lg"
    >
      <div className="relative h-48">
        <NavLink to={`/tin-tuc/chi-tiet-tin?post=${item.slug}`}>
          <img
            className="h-full w-full rounded-t object-cover"
            src={`${import.meta.env.VITE_ENDPOINT}${item.image}`}
            alt={item.title}
          />
        </NavLink>

        <div className="absolute bottom-[-1px] left-0 flex items-center justify-center rounded-tr-lg bg-white px-4 py-1 text-sm text-gray-600">
          <span className="text-xs font-medium md:text-base">
            {item.published_date}
          </span>
        </div>
      </div>
      <div className="px-2 py-2 md:px-6">
        <h5
          className="mb-1 line-clamp-2 font-bold tracking-wide text-neutral-800 sm:text-base md:mb-2"
          title={item.title}
        >
          <NavLink to={`/tin-tuc/chi-tiet-tin?post=${item.slug}`}>
            {item.title}
          </NavLink>
        </h5>

        <p
          className="mb-1 line-clamp-2 text-xs font-normal text-gray-600 opacity-80 md:mb-2 md:line-clamp-3 md:text-base"
          title={item.short_description}
        >
          {item.short_description}
        </p>
      </div>
    </div>
  );
}
