import { NavLink } from "react-router-dom";

export default function CardLeft({ heading, items }) {
  return (
    <>
      <div className="mt-8 md:mt-10">
        <h4 className="pb-2 text-lg font-bold">{heading}</h4>
        {items.map((item) => (
          <NavLink key={item.id} to={`chi-tiet-tin?post=${item.slug}`}>
            <div className="mt-4 flex gap-2">
              <div className="w-3/12">
                <img
                  src={`${import.meta.env.VITE_ENDPOINT}${item.image}`}
                  alt="anh"
                  className="h-20 w-full rounded-md object-cover"
                />
              </div>
              <p className="w-9/12 text-sm font-semibold">{item.title}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </>
  );
}
