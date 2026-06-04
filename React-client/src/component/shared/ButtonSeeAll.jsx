import { FaArrowRightLong } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import BtnAnimation from "./BtnAnimation";

export default function ButtonSeeAll(params) {
  return (
    <div
      data-aos="fade-up"
      data-aos-offset="100"
      className="flex justify-center py-4"
    >
      <BtnAnimation>
        <NavLink
          to={params.link}
          className="group flex items-center rounded-md border-2 border-[#72a834] px-5 py-1 text-base font-medium leading-snug text-primary shadow duration-300 hover:border-primary hover:bg-primary hover:text-white md:px-6 md:py-1.5 md:text-lg md:font-medium md:leading-relaxed"
        >
          Xem tất cả
          <span className="ml-2 group-hover:animate-swing md:ml-4">
            <FaArrowRightLong />
          </span>
        </NavLink>
      </BtnAnimation>
    </div>
  );
}
