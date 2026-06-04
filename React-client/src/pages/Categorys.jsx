import { useLoaderData } from "react-router-dom";
import Breadcrumb from "../component/shared/Breadcrumb";
import SideBar from "../component/danhMuc/siderBar/SideBar";
import RightContent from "../component/danhMuc/mainContainer/RightContent";
import Card from "../component/shared/Card";
import ModalDetail from "../component/shared/ModalDetail";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Categorys() {
  useEffect(() => {
    // document.title = "Danh mục | xedap_3s";
    document.title = `Danh mục | ${import.meta.env.VITE_WEBSITE_NAME}`;
  }, []);

  const dataLoader = useLoaderData();
  const showPopup = useSelector((state) => state.popupDetail.popUp);

  return (
    <main className="overflow-hidden">
      <Breadcrumb
        nav1=""
        nav1Link=""
        nav2=""
        nav2Link=""
        navEnd="Tất cả sản phẩm"
      />
      <Card>
        <div className="block gap-4 xl:grid xl:grid-cols-[260px_auto]">
          <SideBar dataLoader={dataLoader} />
          <RightContent dataLoader={dataLoader} />
        </div>
      </Card>
      {showPopup && (
        <div className="duration-300">
          <ModalDetail />
        </div>
      )}
    </main>
  );
}
