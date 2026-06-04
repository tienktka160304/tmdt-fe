import { useEffect, useState } from "react";
import { getPost } from "../../api/postNews";
import { NavLink } from "react-router-dom";

export default function PostRelate({ cate, id }) {
  const [postListState, setPostListState] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      try {
        const response = await getPost({ category: cate, limit: 2 });
        setPostListState(response.data);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        console.error("❌❌❌ Error fetching :", error);
      }
      setLoading(false);
    }
    fetchPost();
  }, []);

  return (
    <>
      <div className="mt-8 md:mt-11">
        <h4 className="pb-2 text-lg font-bold">Bài viết liên quan</h4>
        {!loading &&
          postListState.length > 0 &&
          postListState
            .filter((item) => item.id !== id)
            .map((item) => (
              <NavLink key={item.id} to={`?post=${item.slug}`}>
                <div className="mt-4 flex max-w-[450px] gap-2">
                  <div className="w-3/12">
                    <img
                      src={`${import.meta.env.VITE_ENDPOINT}${item.image}`}
                      alt="anh"
                      className="h-20 w-full rounded-md object-cover"
                    />
                  </div>
                  <p className="w-9/12 text-sm font-semibold">{item.title}</p>
                </div>
              </NavLink>
            ))}
      </div>
    </>
  );
}
