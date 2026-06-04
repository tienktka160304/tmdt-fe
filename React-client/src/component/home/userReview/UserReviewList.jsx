import "./UserReviewList.css";
import React from "react";
import Slider from "react-slick";
import BoxUserReview from "./BoxUserReview";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
//import { useFetch } from "../../../hook/useFeach";
//import { getReviewWeb } from "../../../api/user";
import { useHomeData } from "../../../context/HomeDataContext";
export function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`text-md absolute left-0 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#46464628] text-sm text-white shadow duration-300 hover:scale-110 hover:bg-gray-500 active:scale-95 md:left-6 md:h-9 md:w-9 md:text-lg lg:left-12`}
      onClick={onClick}
    >
      <FaChevronLeft />
    </div>
  );
}

export function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`absolute right-0 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#46464628] text-sm text-white shadow duration-300 hover:scale-110 hover:bg-gray-500 active:scale-95 md:right-6 md:h-9 md:w-9 md:text-lg lg:right-12`}
      onClick={onClick}
    >
      <FaChevronRight />
    </div>
  );
}
export default function UserReviewList(params) {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "100px",
    slidesToShow: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 10000,
    responsive: [
      { breakpoint: 1280, settings: { centerPadding: "100px" } },
      { breakpoint: 1023, settings: { centerPadding: "60px" } },
      { breakpoint: 767, settings: { centerPadding: "50px" } },
      { breakpoint: 480, settings: { centerPadding: "10px" } },
      {
        breakpoint: 360,
        settings: { centerPadding: "10px" },
      },
    ],
  };
  //const { fetchedData } = useFetch(getReviewWeb, []);
  const { homeData, isFetching } = useHomeData();
  const fetchedData = homeData?.reviews ?? null;
  return (
    <div className="py-10">
      <div
        data-aos="zoom-in"
        data-aos-delay="400"
        className="slider-container w-full"
      >
        <Slider {...settings} className="">
          {fetchedData?.data?.length > 0 &&
            fetchedData?.data.map((item) => (
              <BoxUserReview key={item.id} item={item} />
            ))}
        </Slider>
      </div>
    </div>
  );
}
