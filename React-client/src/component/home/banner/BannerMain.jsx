//import { useFetch } from "../../../hook/useFeach";
import { useHomeData } from "../../../context/HomeDataContext";

import Banner from "./Banner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
//import { fetchBannerOne } from "../../../api/home";

export default function BannerMain() {
  //const { fetchedData } = useFetch(fetchBannerOne, []);
  const { homeData, isFetching } = useHomeData();
  const fetchedData = homeData?.bannerOne ?? null;

  //const bannerCount = fetchedData?.length || 0;

  const settings = {
    //infinite: bannerCount > 1,
    arrows: false,
    speed: 600,
    //lazyLoad: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const isEmpty = !fetchedData || fetchedData.length === 0;
  return (
    <>
      {isEmpty ? (
        <Slider {...settings}>
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="h-96 w-full animate-pulse cursor-wait bg-loading opacity-50"
            />
          ))}
        </Slider>
      ) : (
        <Slider {...settings} className="h-auto w-full">
          {fetchedData.map((item) => (
            <Banner key={item.id} item={item} />
          ))}
        </Slider>
      )}
    </>
  );
}
