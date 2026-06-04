import { NavLink } from "react-router-dom";

export default function ImgSale({ item, dataaos }) {
  return (
    <>
      <NavLink
        data-aos={dataaos}
        to={import.meta.env.VITE_APP + item.link}
        className="col-span-2 h-full max-h-[350px] w-full shadow duration-500 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-md"
      >
        <img
          src={import.meta.env.VITE_ENDPOINT + item.image}
          alt="aa"
          className="h-full max-h-[350px] w-full rounded object-cover"
        />
      </NavLink>
    </>
  );
}
