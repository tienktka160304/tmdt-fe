import { useLoaderData } from "react-router-dom";
import ChitietSanPham from "../component/detail/ChitietSanPham";
import Breadcrumb from "../component/shared/Breadcrumb";
import MoTaSanPham from "../component/detail/MoTaSanPham";
import BinhLuan from "../component/detail/BinhLuan";
import { fetchDetailProduct } from "../api/detail-product";
import ProductRelate from "../component/detail/ProductRelate";
import ModalDetail from "../component/shared/ModalDetail";
import { useSelector } from "react-redux";
import { useEffect, useLayoutEffect } from "react";

export default function DetailProduct() {
  const product = useLoaderData();

  useEffect(() => {
    document.title = `${product.name} | ${import.meta.env.VITE_WEBSITE_NAME}`;
  }, []);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [product]);

  const showPopup = useSelector((state) => state.popupDetail.popUp);
  return (
    <>
      <main>
        <Breadcrumb
          nav1={product.sub_category?.name}
          nav1Link={`/san-pham?category=${product.sub_category?.slug}`}
          nav2=""
          nav2Link=""
          navEnd={product.name}
        />
        <ChitietSanPham fetchedData={product} />
        <MoTaSanPham mota={product.description} attribute={product.attribute} />
        <ProductRelate cate={product.id_category} id={product.id} />
        <BinhLuan id={product.id} />
      </main>
      {showPopup && (
        <div className="duration-300">
          <ModalDetail />
        </div>
      )}
    </>
  );
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const sp = url.searchParams.get("sp");
  if (!sp) {
    throw new Response(JSON.stringify({ message: "Thiếu tham số sản phẩm" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return fetchDetailProduct(sp);
}
