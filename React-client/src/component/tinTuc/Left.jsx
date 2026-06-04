import { fetchHotViewsPost } from "../../api/postNews";
import { useFetch } from "../../hook/useFeach";
import CardLeft from "./CardLeft";

export default function Left(params) {
  const { isFetching, fetchedData } = useFetch(fetchHotViewsPost, []);
  return (
    <>
      <div className="flex flex-col">
        {!isFetching && fetchedData?.status == "success" && (
          <>
            <CardLeft heading="Bài viết Nổi Bất" items={fetchedData?.hot} />
            <CardLeft heading="Bài viết xem nhiều" items={fetchedData?.views} />
          </>
        )}
      </div>
    </>
  );
}
