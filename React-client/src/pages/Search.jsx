import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../component/shared/ProductCard";
import Pagination from "../component/shared/Pagination";
import { fetchsearch } from "../api/http";
import ModalDetail from "../component/shared/ModalDetail";
import { useSelector } from "react-redux";
import Breadcrumb from "../component/shared/Breadcrumb";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const pageParam = searchParams.get("page") || 1;
  const [productTotalState, setProductTotalState] = useState(0);

  const showPopup = useSelector((state) => state.popupDetail.popUp);
  useEffect(() => {
    // document.title = "Tìm kiếm | xedap_3s";
    document.title = `Tìm kiếm | ${import.meta.env.VITE_WEBSITE_NAME}`;
  }, []);

  useEffect(() => {
    if (!query) return;
    setLoading(true);

    async function fetchResults() {
      try {
        const response = await fetchsearch(query, 8, pageParam);
        setResults(response.data.data);
        setProductTotalState(response.data.total);
        window.scrollTo({ top: 0, behavior: "smooth" });
        setCurrentPage(response.data.current_page);
        setLastPage(response.data.last_page);
      } catch (error) {
        console.error("❌ Lỗi tìm kiếm:", error);
      }
      setLoading(false);
    }
    fetchResults();
  }, [query, pageParam]);

  function handleSetPage(pageNumber) {
    if (currentPage === pageNumber) return;
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", pageNumber);
    setSearchParams(newSearchParams);
  }

  return (
    <>
      <Breadcrumb nav1="" nav1Link="" nav2="" nav2Link="" navEnd="Tìm kiếm" />
      <main className="bg-greenwhite">
        <section className="container py-8">
          <div className="py-4">
            <h5 className="mb-2 text-xl font-bold">
              Kết quả tìm kiếm cho: "{query}"
            </h5>
            <p>Có {productTotalState} tìm kiếm</p>
          </div>
          <div className="py-8">
            {loading ? (
              <p>Đang tải...</p>
            ) : results.length > 0 ? (
              <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {results.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">
                Không tìm thấy sản phẩm nào.
              </p>
            )}
          </div>
          {!loading &&
            lastPage > 0 &&
            (productTotalState > 8 ? (
              <Pagination
                currentPage={currentPage}
                totalPages={lastPage}
                onPageChange={handleSetPage}
                displayRange={1}
              />
            ) : (
              ""
            ))}
        </section>
      </main>
      {showPopup && (
        <div className="duration-300">
          <ModalDetail />
        </div>
      )}
    </>
  );
}
