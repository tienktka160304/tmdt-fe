import { useLoaderData } from "react-router-dom";
import { TbUserHexagon } from "react-icons/tb";
import { PiCalendarDotsBold } from "react-icons/pi";
import { fetchDetailPost } from "../../api/postNews";
import PostRelate from "../../component/tinTuc/PostRelate";
import { useEffect } from "react";

export default function NewsDetail() {
  const post = useLoaderData();

  useEffect(() => {
    document.title = `${post.title} | ${import.meta.env.VITE_WEBSITE_NAME}`;
  }, []);

  return (
    <div data-aos="fade-right" data-aos-delay="200">
      <div className="mb-2 inline-block rounded bg-green-400 px-2 py-1 text-sm text-white shadow md:px-4 md:py-2">
        {post?.post_category?.name}
      </div>
      <h1 className="text-2xl font-semibold lg:text-3xl">{post.title}</h1>
      <p className="pb-6 pt-2 text-gray-500">
        <span className="mr-10 text-sm">
          <TbUserHexagon className="mr-2 inline-block text-xl" />
          {post?.user?.last_name} {post?.user?.first_name}
        </span>
        <span className="mr-10 text-sm">
          <PiCalendarDotsBold className="mr-2 inline-block text-xl" />
          {post.published_date}
        </span>
        <span className="mr-10 text-sm">
          <PiCalendarDotsBold className="mr-2 inline-block text-xl" />
          {post.views} lượt xem
        </span>
      </p>

      <div className="px-6 text-gray-500">
        <img
          src={`${import.meta.env.VITE_ENDPOINT}${post.image}`}
          alt="anhs"
          className="h-auto w-full rounded-md object-cover shadow-md"
        />
        <p className="py-6">{post.short_description}</p>
      </div>

      <div className="post-content leading-8">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      <div>
        <PostRelate cate={post?.post_category?.slug} id={post.id} />
      </div>
    </div>
  );
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const post = url.searchParams.get("post");

  if (!post) {
    throw new Response(JSON.stringify({ message: "Thiếu tham số sản phẩm" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
  return fetchDetailPost(post);
}
