import FilterCpm from "./FilterCpm";
import Brand from "./Brand";
import { createPortal } from "react-dom";
import { CgClose } from "react-icons/cg";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import DoiTuong from "./DoiTuong";
import FilterPrice from "./FilterPrice";

export default function SideBar({ dataLoader }) {
  const [isPopUp, setPopUpState] = useState(true);

  function BarItems() {
    return (
      <>
        <h4 className="text-center text-xl font-bold">Sản phẩm</h4>
        {dataLoader.category.map((item) => (
          <FilterCpm
            key={item.id}
            title={item.name}
            items={item.sub_category}
            id={item.id}
          />
        ))}
        <DoiTuong items={dataLoader.doiTuong} title="Đối tượng" />
        <Brand title="Thương hiệu" brand={dataLoader.brand} />
        <FilterPrice />
      </>
    );
  }

  function slider() {
    return createPortal(
      <>
        <div
          onClick={() => setPopUpState(true)}
          className={`fixed top-0 z-40 block h-full w-full bg-black/40 duration-500 xl:hidden ${isPopUp ? "-left-full" : ""}`}
        ></div>

        <aside
          className={`fixed top-0 z-50 block h-full w-64 overflow-auto bg-white transition-all duration-1000 xl:hidden ${isPopUp ? "-left-full" : "left-0"}`}
        >
          <div className="px-2 py-1 text-right">
            <CgClose
              className="inline-block text-xl"
              onClick={() => setPopUpState(true)}
            />
          </div>
          <div className="px-1">{BarItems()}</div>
        </aside>
      </>,
      document.getElementById("modal"),
    );
  }

  return (
    <>
      <button
        className="fixed bottom-5 left-10 z-50 block h-10 w-10 rounded-full bg-primary p-1 text-white shadow-sm xl:hidden"
        onClick={() => setPopUpState(false)}
      >
        <FaFilter className="inline-block" />
      </button>

      <aside
        data-aos="zoom-in"
        data-aos-delay="400"
        className="relative hidden xl:block"
      >
        <div className="sticky top-20 rounded-md border bg-white py-4 shadow">
          {BarItems()}
        </div>
      </aside>
      {slider()}
    </>
  );
}