import { NavLink } from "react-router-dom";

export default function Banner({ item }) {
  return (
    <>
      <div className="max-h-[500px]" data-aos="zoom-in" data-aos-delay="800">
        <NavLink to={import.meta.env.VITE_APP + item.link}>
          <img
            src={import.meta.env.VITE_ENDPOINT + item.image}
            className="h-full w-full object-cover"
            alt=""
          />
        </NavLink>
      </div>
    </>
  );
}
