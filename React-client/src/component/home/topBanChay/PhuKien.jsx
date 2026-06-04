import ProductCard from "../../shared/ProductCard";
import ButtonSeeAll from "../../shared/ButtonSeeAll";
import UIGrid from "../../shared/UIGrid";
//import { useFetch } from "../../../hook/useFeach";
//import { fetchProductBestSellingPhuKien } from "../../../api/home";
import { useHomeData } from "../../../context/HomeDataContext";

function PhuKien({ state }) {
  //const { fetchedData } = useFetch(fetchProductBestSellingPhuKien, []);
  const { homeData, isFetching } = useHomeData();
  const fetchedData = homeData?.bestSellingPhuKien ?? null;
  if (state) return;

  return (
    <>
      <UIGrid>
        {fetchedData?.length > 0 &&
          fetchedData.map((item, index) => (
            <ProductCard
              key={item.id}
              product={item}
              delay={index}
              dataaos="fade-left"
            />
          ))}
      </UIGrid>
      <ButtonSeeAll link="/san-pham?ct=best-selling&category=phu-kien-xe-dap-15" />
    </>
  );
}
export default PhuKien;
