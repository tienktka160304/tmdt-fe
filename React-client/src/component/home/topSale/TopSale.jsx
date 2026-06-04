import Card from "../../shared/Card";
import ProductCard from "../../shared/ProductCard";
import BannerSale from "./BannerSale";
//import { useFetch } from "../../../hook/useFeach";
import CountDown from "./CountDown";
//import { fetchProductFlashsale } from "../../../api/home";
import { useHomeData } from "../../../context/HomeDataContext";

export default function TopSale(params) {
  //const { fetchedData } = useFetch(fetchProductFlashsale, []);
  const { homeData, isFetching } = useHomeData();
  const fetchedData = homeData
    ? { data: homeData.flashSaleProducts, sale: homeData.flashSale }
    : null;
  return (
    <section id="flashsale">
      <Card>
        <div className="bg-gradient-sales rounded-md p-4 shadow">
          <div className="flex justify-between pb-8 pt-4">
            <div data-aos="zoom-in" data-aos-delay="200">
              <img
                src="/flash.webp"
                className="w-24 origin-top animate-swing sm:w-32 md:w-40"
                alt=""
              />
            </div>
            <div>
              {fetchedData?.data?.length > 0 && (
                <CountDown dest={fetchedData.sale?.time_end} />
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-5 lg:grid-cols-4 xl:grid-cols-4">
            {fetchedData?.data?.length > 0 &&
              fetchedData?.data.map((item, index) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  delay={index}
                  dataaos="zoom-in-up"
                />
              ))}
          </div>
          <BannerSale />
        </div>
      </Card>
    </section>
  );
}
