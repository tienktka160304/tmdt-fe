import Slider from "react-slick";
import { fetchProductRelate } from "../../api/detail-product";
import { useFetch } from "../../hook/useFeach";
import BoxLoading from "../home/cateHome/BoxLoading";
import ProductCard from "../shared/ProductCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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
export default function ProductRelate({ cate, id }) {
  const { isFetching, fetchedData } = useFetch(
    () => fetchProductRelate(cate, id),
    [],
  );

  const settings = {
    infinite: fetchedData.length > 4,
    speed: 700,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    pauseOnFocus: false,
    lazyLoad: true,
    autoplay: true,
    slidesToShow: Math.min(4, fetchedData.length),
    slidesToScroll: 1,
    variableWidth: fetchedData.length < 4,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, fetchedData.length),
          slidesToScroll: 1,
          variableWidth: fetchedData.length < 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(2, fetchedData.length),
          slidesToScroll: 1,
          variableWidth: fetchedData.length < 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(2, fetchedData.length),
          slidesToScroll: 1,
          variableWidth: fetchedData.length < 2,
        },
      },
    ],
  };

  return (
    <>
      <div className="container py-24">
        <h3 className="pb-5 text-2xl font-bold"></h3>
        <header className="ml-3 gap-x-4 pb-5">
          <h2 className="text-base font-bold leading-loose text-primary sm:text-lg md:text-xl lg:text-2xl">
            SẢN PHẨM LIÊN QUAN
          </h2>
        </header>
        {!isFetching && fetchedData.length === 0 && (
          <p>Không có sản phẩm liên quan</p>
        )}
        {isFetching && (
          <Slider {...settings} className="w-full">
            <BoxLoading />
            <BoxLoading />
            <BoxLoading />
            <BoxLoading />
            <BoxLoading />
            <BoxLoading />
            <BoxLoading />
          </Slider>
        )}

        <Slider {...settings}>
          {!isFetching &&
            fetchedData?.length > 0 &&
            fetchedData.map((item, index) => (
              <div key={item.id} className="max-w-80 p-5">
                <ProductCard product={item} delay={index} dataaos="zoom-in" />
              </div>
            ))}
        </Slider>
      </div>
    </>
  );
}
