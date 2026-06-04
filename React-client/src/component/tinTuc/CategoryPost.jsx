import { useNavigate, useSearchParams } from "react-router-dom";
import { getMainPost } from "../../api/postNews";
import { useFetch } from "../../hook/useFeach";
import { memo } from "react";

function CategoryPost(params) {
  const { isFetching, fetchedData } = useFetch(getMainPost, []);
  const [searchParam] = useSearchParams();
  const param = searchParam.get("category") || "";

  const navigate = useNavigate();

  function hanldeNavigate(slug) {
    navigate(`/tin-tuc?category=${slug}`);
  }

  return (
    <>
      <div className="my-4 border-y py-2 shadow-sm">
        <ul className="flex items-center justify-center gap-2 text-sm font-medium uppercase md:gap-4 md:text-base">
          {!isFetching &&
            fetchedData?.data?.length > 0 &&
            fetchedData?.data.map((item) => (
              <li data-aos="zoom-in" data-aos-delay="400" key={item.id}>
                <button
                  onClick={() => hanldeNavigate(item.slug)}
                  className={`p-1 ${param == item.slug ? "font-bold text-primary" : "text-gray-600"}`}
                >
                  {item.name}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default memo(CategoryPost);
