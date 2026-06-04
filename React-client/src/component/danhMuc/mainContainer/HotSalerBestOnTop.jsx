import { useSearchParams } from "react-router-dom";
import { MdWorkspacePremium } from "react-icons/md";
import { PiShootingStarFill, PiStarFourFill } from "react-icons/pi";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";

const categories = [
  {
    id: 1,
    slug: "hot",
    label: "Nổi Bật",
    icon: (
      <span className="text-red-500">
        <PiStarFourFill />
      </span>
    ),
    color: "text-red-500",
  },
  {
    id: 2,
    slug: "best-selling",
    label: "Bán Chạy",
    icon: (
      <span className="text-green-900">
        <MdWorkspacePremium />
      </span>
    ),
    color: "text-green-900",
  },
  {
    id: 3,
    slug: "discount-value",
    label: "Khuyến Mãi",
    icon: (
      <span className="text-yellow-500">
        <PiShootingStarFill />
      </span>
    ),
    color: "text-yellow-500",
  },
];

export default function HotSalerBestOnTop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("ct") ?? null;
  function handleSetSlug(value) {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (selectedCategory === value) {
      newSearchParams.delete("ct");
    } else {
      newSearchParams.delete("page");
      newSearchParams.set("ct", value);
    }
    setSearchParams(newSearchParams);
  }

  return (
    <>
      {categories.map((item, index) => (
        <li data-aos="fade-down" data-aos-delay={200 * index} key={item.id}>
          <button
            className="flex items-center gap-x-1 lg:gap-x-2"
            onClick={() => handleSetSlug(item.slug)}
          >
            <span className="text-primary">
              {selectedCategory === item.slug ? (
                <FaCheckCircle />
              ) : (
                <FaRegCircle />
              )}
            </span>
            {item.label}
            {item.icon}
          </button>
        </li>
      ))}
    </>
  );
}
