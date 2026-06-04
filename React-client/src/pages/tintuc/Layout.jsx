import { Outlet } from "react-router-dom";
import CategoryPost from "../../component/tinTuc/CategoryPost";
import Left from "../../component/tinTuc/Left";
import Breadcrumb from "../../component/shared/Breadcrumb";

export default function Layout() {
  return (
    <>
      <Breadcrumb
        nav1="Tin tức"
        nav1Link="/tin-tuc"
        nav2=""
        nav2Link=""
        navEnd=""
      />
      <main className="bg-greenwhite py-4">
        <h1 className="text-center text-2xl">Tin tức</h1>
        <CategoryPost />

        <div className="container bg-greenwhite py-4">
          <div className="grid grid-cols-12 lg:gap-2 xl:gap-12">
            <div className="col-span-12 lg:col-span-9">
              <Outlet />
            </div>

            <div
              data-aos="zoom-in-left"
              data-aos-delay="200"
              className="col-span-12 lg:col-span-3"
            >
              <Left />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
