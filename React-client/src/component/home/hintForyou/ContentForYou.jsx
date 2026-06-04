//import { fetchBannerTwo } from "../../../api/home";
//import { useFetch } from "../../../hook/useFeach";
import { useHomeData } from "../../../context/HomeDataContext";
import ImgSale from "./ImgSale";
import Listproduct from "./Listproduct";

export default function ContentForYou() {
  //const { fetchedData } = useFetch(fetchBannerTwo, []);
  const { homeData } = useHomeData();
  const fetchedData = homeData?.bannerTwo ?? null;

  return (
    <>
      {/* khong co banner  */}
      {fetchedData?.length < 2 && <Listproduct />}

      {/* co banner */}
      {fetchedData?.length >= 2 && (
        <ImgSale item={fetchedData[0]} dataaos="fade-up-right" />
      )}

      <Listproduct dataaos="fade-up" />

      {fetchedData?.length >= 2 && (
        <ImgSale item={fetchedData[1]} dataaos="fade-up-left" />
      )}
    </>
  );
}
