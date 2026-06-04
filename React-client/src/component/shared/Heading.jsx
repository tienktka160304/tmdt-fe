import { memo } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

function Heading(props) {
  return (
    <>
      <header
        data-aos="zoom-in"
        data-aos-offset="100"
        className="relative mb-5"
      >
        <div className="flex items-center justify-center gap-x-4 text-3xl font-bold uppercase leading-10 tracking-[0.2em] text-gray-400/15 sm:text-4xl md:gap-x-6 md:text-5xl lg:text-6xl">
          <span className="">
            <FaArrowRightLong />
          </span>
          <span className="">TMDT</span>
          <span className="rotate-180">
            <FaArrowRightLong />
          </span>
        </div>

        <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/4 text-center text-base font-bold uppercase leading-loose text-primary sm:text-lg md:text-2xl lg:text-3xl">
          {props.headingName}
        </h2>
      </header>
    </>
  );
}

export default memo(Heading);
