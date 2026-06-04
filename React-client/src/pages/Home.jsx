import CateHome from "../component/home/cateHome/CateHome";
import HintForyour from "../component/home/hintForyou/HintForyour";
import TopSale from "../component/home/topSale/TopSale";
import News from "../component/home/news/News";
import Brands from "../component/home/brand/Brands";
import UserReviews from "../component/home/userReview/UserReviews";
import BannerMain from "../component/home/banner/BannerMain";
import TopBanChay from "../component/home/topBanChay/TopBanChay";
import ModalDetail from "../component/shared/ModalDetail";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import AboutCPM from "../component/home/aboutCPM/AboutCPM";
import LoadingOverlay from "../component/shared/LoadingOverlay";
import { HomeDataProvider } from "../context/HomeDataContext";

export default function Home() {
  const showPopup = useSelector((state) => state.popupDetail.popUp);
  useEffect(() => {
    // document.title = "Trang chủ | xedap_3s";
    document.title = `Trang chủ | ${import.meta.env.VITE_WEBSITE_NAME}`;
  }, []);
  return (
    <HomeDataProvider>
      <>
        {/* <LoadingOverlay /> */}

        <main className="overflow-hidden">
          <BannerMain />
          <CateHome />
          <HintForyour />
          <div className="flex items-center justify-center gap-4 bg-greenwhite py-4">
            <div className="h-1 w-8 bg-gray-200"></div>
            <div className="h-1 w-8 bg-gray-200"></div>
            <div className="h-1 w-8 bg-gray-200"></div>
            <div className="h-1 w-8 bg-gray-200"></div>
          </div>
          <TopSale />
          <TopBanChay />

          <News />
          <Brands />
          <div className="flex items-center justify-center gap-4 py-4">
            <div className="h-1 w-8 bg-gray-200"></div>
            <div className="h-1 w-8 bg-gray-200"></div>
            <div className="h-1 w-8 bg-gray-200"></div>
            <div className="h-1 w-8 bg-gray-200"></div>
          </div>
          <AboutCPM />

          <UserReviews />
        </main>

        {showPopup && (
          <div className="duration-300">
            <ModalDetail />
          </div>
        )}
      </>
    </HomeDataProvider>
  );
}
