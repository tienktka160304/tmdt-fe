import { memo, useMemo } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
//import { useFetch } from "../../../hook/useFeach";
import Card from "../../shared/Card";
import BoxCate from "./BoxCate";
//import { fetchSubCategory } from "../../../api/productcategory";
import { useHomeData } from "../../../context/HomeDataContext";

export function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button
      className={`custom-prev-arrow btn-arrow right-12 mr-0 py-1 pl-1 pr-2 md:mr-2 md:py-2 md:pl-2 md:pr-4`}
      onClick={onClick}
    >
      <FaArrowLeft />
    </button>
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

function CateHome() {
  //const { fetchedData } = useFetch(fetchSubCategory, []);
  const { homeData, isFetching } = useHomeData();
  const fetchedData = homeData?.subCategories ?? [];

  const categoryFilter = useMemo(() => {
    if (!fetchedData) return []; // Tránh lỗi khi dữ liệu chưa có
    return fetchedData
      .filter((category) => category.products_count > 0)
      .sort((a, b) => a.sort - b.sort);
  }, [fetchedData]);

  const settings = {
    // dots: true,
    infinite: true,
    // speed: 500,
    lazyLoad: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1537,
        settings: { slidesToShow: 6, slidesToScroll: 1, centerPadding: "30px" },
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

  return <Card bg="bg-white"></Card>;
}
export default memo(CateHome);
