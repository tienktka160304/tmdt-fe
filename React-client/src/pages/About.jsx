import { useEffect, useState } from "react";
import Card from "../component/shared/Card";
import GioiThieu from "../component/about/GioiThieu";
import HuongDanMua from "../component/about/HuongDanMua";
import ThoiGianGiao from "../component/about/ThoiGianGiao";
import DoiTraHang from "../component/about/DoiTraHang";
import Breadcrumb from "../component/shared/Breadcrumb";
import { HuongDanShip } from "../component/about/HuongDanShip";

const menuItems = [
  {
    id: "gioi-thieu",
    label: "GIỚI THIỆU VỀ TMDT 3S",
    content: <GioiThieu />,
  },
  {
    id: "huong-dan",
    label: "HƯỚNG DẪN MUA HÀNG",
    content: <HuongDanMua />,
  },
  {
    id: "thoi-gian",
    label: "THỜI GIAN GIAO HÀNG",
    content: <ThoiGianGiao />,
  },
  {
    id: "phi-van-chuyen",
    label: "PHÍ VẬN CHUYỂN",
    content: <HuongDanShip />,
  },
  {
    id: "doi-tra",
    label: "ĐỔI TRẢ VÀ HỦY ĐƠN HÀNG",
    content: <DoiTraHang />,
  },
];
export default function About(params) {
  const [selectedId, setSelectedId] = useState("gioi-thieu");
  useEffect(() => {
    document.title = `Giới thiệu | ${import.meta.env.VITE_WEBSITE_NAME}`;
  }, []);
  return (
    <>
      <Breadcrumb
        nav1=""
        nav1Link=""
        nav2=""
        nav2Link=""
        navEnd="Giới thiệu về TMDT 3S"
      />
      <section>
        <Card>
          <main className="grid grid-cols-12 overflow-hidden lg:gap-20">
            <div className="col-span-12 mb-5 sm:col-span-3">
              {menuItems.map((item, index) => (
                <div
                  data-aos="fade-right"
                  delay={500 * index}
                  key={item.id}
                  className={`cursor-pointer p-2 text-base font-bold ${
                    selectedId === item.id ? "text-green-600" : "text-black"
                  }`}
                  onClick={() => setSelectedId(item.id)}
                >
                  {item.label}
                </div>
              ))}
            </div>

            <div className="col-span-12 sm:col-span-9">
              {menuItems.find((item) => item.id === selectedId)?.content}
            </div>
          </main>
        </Card>
      </section>
    </>
  );
}
