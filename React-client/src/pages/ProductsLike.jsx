import { useEffect } from "react";
import Card from "../component/shared/Card";
import { getToken } from "../util/auth";
import { useFetch } from "../hook/useFeach";
import { getFavorites } from "../api/yeuthich";
import ProductCard from "../component/shared/ProductCard";
import UIGrid from "../component/shared/UIGrid";
import { NavLink, useNavigate } from "react-router-dom";
import { checkToken } from "../api/user";
import ModalDetail from "../component/shared/ModalDetail";
import { useSelector } from "react-redux";
import Breadcrumb from "../component/shared/Breadcrumb";

export default function ProductsLike() {
  const navigate = useNavigate();
  const Token = getToken();
  const showPopup = useSelector((state) => state.popupDetail.popUp);

  useEffect(() => {
    async function kt() {
      const { valid } = await checkToken();
      if (!valid) {
        navigate("/");
      }
    }
    if (!Token) {
      navigate("/");
      return;
    } else {
      kt();
    }
  }, [Token]);

  const { isFetching, fetchedData } = useFetch(getFavorites, []);

  useEffect(() => {
    // document.title = "Yêu thích | xedap_3s";
    document.title = `Yêu thích | ${import.meta.env.VITE_WEBSITE_NAME}`;
  }, []);
  return (
    <>
      <Breadcrumb
        nav1=""
        nav1Link=""
        nav2=""
        nav2Link=""
        navEnd="Danh sách yêu thích"
      />
      <Card>
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">
            Danh sách yêu thích
          </h1>
          {!isFetching && fetchedData?.data?.length <= 0 && (
            <>
              <p className="py-14 text-center text-2xl font-semibold text-gray-500">
                Không có sản phẩm nào được yêu thích
              </p>
              <p className="text-center">
                <NavLink
                  to="/"
                  className="rounded-md bg-primary px-8 py-2 font-semibold text-white hover:bg-primary/80"
                >
                  Quay lại trang chủ
                </NavLink>
              </p>
            </>
          )}
          <UIGrid>
            {!isFetching &&
              fetchedData?.data?.length > 0 &&
              fetchedData?.data.map((item, index) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  delay={index}
                  dataaos="zoom-in-up"
                />
              ))}
          </UIGrid>
        </div>
      </Card>
      {showPopup && (
        <div className="duration-300">
          <ModalDetail />
        </div>
      )}
    </>
  );
}
