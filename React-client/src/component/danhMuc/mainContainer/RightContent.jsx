import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../shared/ProductCard";
import CardLoading from "../../shared/CardLoading";
import Sort from "./Sort";
import Pagination from "../../shared/Pagination";
import HotSalerBestOnTop from "./HotSalerBestOnTop";
import { fetchProductPageCategory } from "../../../api/productcategory";

export default function RightContent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [productListState, setProductListState] = useState([]);
  const [productTotalState, setProductTotalState] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sortDisplay, setsortDisplay] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const categoryParam = searchParams.get("category") || "";
  const ctParam = searchParams.get("ct") || "";
  const brandParam = searchParams.get("brand") || "";
  const dtParam = searchParams.get("dt") || "";
  const priceMinParam = searchParams.get("pricemin") || "";
  const priceMaxParam = searchParams.get("pricemax") || "";
  const pageParam = searchParams.get("page") || 1;
  const params = {};
  if (categoryParam) params.category = categoryParam;
  if (ctParam) params.ct = ctParam;
  if (brandParam) params.brand = brandParam;
  if (dtParam) params.dt = dtParam;
  if (priceMinParam) params.pricemin = priceMinParam;
  if (priceMaxParam) params.pricemax = priceMaxParam;
  if (pageParam) params.page = pageParam;
  params.sort = sortDisplay;

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const response = await fetchProductPageCategory(params);
        setProductListState(response.data.data);
        setProductTotalState(response.data.total);
        setCurrentPage(response.data.current_page);
        setLastPage(response.data.last_page);
      } catch (error) {
        console.error("❌❌❌ Error fetching products:", error);
      }
      setLoading(false);
    }
    fetchProduct();
  }, [JSON.stringify(params)]);

  function handleSetPage(pageNumber) {
    if (currentPage === pageNumber) return;
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", pageNumber);
    setSearchParams(newSearchParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main>
      <div className="flex flex-wrap justify-between md:flex-row md:items-center">
        <ul className="flex flex-col flex-wrap pl-2 text-sm font-medium text-gray-600 md:flex-row md:items-center md:space-x-5 lg:text-base">
          <HotSalerBestOnTop />
          <Sort setsortDisplay={setsortDisplay} sortDisplay={sortDisplay} />
        </ul>
        <p
          data-aos="fade-down"
          data-aos-delay="1200"
          className="gray-400 rounded-lg px-4 py-1 text-sm font-medium lg:text-base"
        >
          {productTotalState} sản phẩm
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 py-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-4 xl:grid-cols-3 2xl:grid-cols-4">
        {loading ? (
          <>
            <CardLoading />
            <CardLoading />
            <CardLoading />
            <CardLoading />
            <CardLoading />
            <CardLoading />
            <CardLoading />
            <CardLoading />
          </>
        ) : productListState?.length > 0 ? (
          productListState.map((item, index) => (
            <ProductCard
              key={item.id}
              product={item}
              delay={index}
              dataaos="fade-up-left"
            />
          ))
        ) : (
          <p className="text-center text-2xl text-gray-500">
            xin lổi hết hàng mất rồi 😁😁😁!!!
          </p>
        )}
      </div>

      {!loading && lastPage > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={lastPage}
          onPageChange={handleSetPage}
          displayRange={1}
        />
      )}
    </main>
  );
}
