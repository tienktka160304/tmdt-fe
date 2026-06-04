import { NavLink, useSearchParams } from "react-router-dom";
import { TbUserHexagon } from "react-icons/tb";
import { PiCalendarDotsBold } from "react-icons/pi";
import { useEffect, useState } from "react";
import { getPost } from "../../api/postNews";
import Pagination from "../../component/shared/Pagination";

export default function NewsCategory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [postListState, setPostListState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastPage, setLastPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const category = searchParams.get("category") || null;
  const getPage = searchParams.get("page") || 1;
  const params = {};

  if (category !== null) {
    params.category = category;
  }
  if (getPage !== 1) {
    params.page = getPage;
  }

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const response = await getPost(params);
        setPostListState(response);
        setCurrentPage(response.current_page);
        setLastPage(response.last_page);
        window.scrollTo({ top: 0, behavior: "smooth" });
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
  }

  useEffect(() => {
    document.title = `Tin tức | ${import.meta.env.VITE_WEBSITE_NAME}`;
  }, []);

  return (
    <>
      {!loading &&
        postListState?.data?.length > 0 &&
        postListState?.data.map((item) => (
          <div
            data-aos="zoom-in-up"
            data-aos-delay="200"
            key={item.id}
            className="mt-2 md:mt-8"
          >
            <NavLink to={`chi-tiet-tin?post=${item.slug}`}>
              <div className="flex">
                <div className="w-4/12 md:w-3/12">
                  <div>
                    <div className="relative shadow">
                      <img
                        src={`${import.meta.env.VITE_ENDPOINT}${item.image}`}
                        alt="anhs"
                        className="h-36 w-full object-cover md:h-44"
                      />
                      <span className="absolute left-1 top-1 rounded bg-green-400 p-1 text-xs text-white shadow">
                        {item?.post_category?.name}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="ml-2 w-8/12 md:ml-6 md:w-9/12">
                  <div>
                    <h3 className="line-clamp-2 text-sm font-medium md:text-lg md:font-bold">
                      {item.title}
                    </h3>
                    <p className="py-1 text-gray-500">
                      <span className="mr-2 text-sm md:mr-10">
                        <TbUserHexagon className="mr-1 inline-block text-xl md:mr-2" />
                        {item?.user?.last_name} {item?.user?.first_name}
                      </span>

                      <span className="mr-2 text-sm md:mr-10">
                        <PiCalendarDotsBold className="mr-1 inline-block text-xl md:mr-2" />
                        {item.published_date}
                      </span>
                    </p>
                    <p className="line-clamp-4 pt-1 text-xs leading-5 md:text-sm md:leading-6">
                      {item.short_description}
                    </p>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
        ))}

      {!loading && lastPage > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={lastPage}
          onPageChange={handleSetPage}
          displayRange={1}
        />
      )}
    </>
  );
}
