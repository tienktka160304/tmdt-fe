import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useMemo } from "react";
//import { useFetch } from "../../../hook/useFeach";
import BoxBrand from "./BoxBrand";
//import { fetchBrand } from "../../../api/productcategory";
import { useHomeData } from "../../../context/HomeDataContext";

export function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`custom-prev-arrow btn-arrow right-12 mr-0 py-1 pl-1 pr-2 md:mr-2 md:py-2 md:pl-2 md:pr-4`}
      onClick={onClick}
    >
      <FaArrowLeft />
    </div>
  );
}

export function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`custom-next-arrow btn-arrow right-5 py-1 pl-2 pr-1 md:py-2 md:pl-4 md:pr-2`}
      onClick={onClick}
    >
      <FaArrowRight />
    </div>
  );
}

export default function BrandList(params) {
  //const { fetchedData } = useFetch(fetchBrand, []);
  const { homeData, isFetching } = useHomeData();
  const fetchedData = homeData?.brands ?? null;
  const brandFilter = useMemo(() => {
    if (!fetchedData) return []; // Tránh lỗi khi dữ liệu chưa có
    return fetchedData.sort((a, b) => b.products_count - a.products_count);
  }, [fetchedData]);

  const settings = {
    infinite: true,
    lazyLoad: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1537,
        settings: { slidesToShow: 7, slidesToScroll: 1, centerPadding: "30px" },
      },
      { breakpoint: 1280, settings: { slidesToShow: 5, slidesToScroll: 1 } },
      { breakpoint: 1023, settings: { slidesToShow: 4, slidesToScroll: 1 } },
      { breakpoint: 767, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      {
        breakpoint: 360,
        settings: { slidesToShow: 1, slidesToScroll: 1, centerMode: true },
      },
    ],
  };

  return (
    <div className="py-1">
      <Slider {...settings} className="w-full">
        {brandFilter?.length > 0 &&
          brandFilter.map((item, index) => (
            <BoxBrand
              key={item.id}
              item={item}
              dataaos="zoom-in"
              delay={index}
            />
          ))}
      </Slider>
    </div>
  );
}
