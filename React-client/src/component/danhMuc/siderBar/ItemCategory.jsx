import { useCallback } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

export default function Item({ name, handleTypeChange, slug }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const isActiveCate = useCallback(
    (slug) => {
      const types = searchParams.get("category")?.split(",") || [];
      return types.includes(slug);
    },
    [searchParams],
  );

  return (
    <>
      <li className="flex items-center py-1">
        <button
          className={`text-left text-sm font-normal capitalize text-black first-letter:uppercase hover:text-primary ${
            isActiveCate(slug) ? "font-semibold text-green-700" : ""
          }`}
          onClick={() => handleTypeChange(slug)}
        >
          <span className="pr-2">
            {/* Hiển thị icon theo trạng th ái đã chọn */}
            {isActiveCate(slug) ? (
              <MdCheckBox className="inline-block text-lg md:text-xl" />
            ) : (
              <MdCheckBoxOutlineBlank className="inline-block text-lg md:text-xl" />
            )}
          </span>
          <span>{name}</span>
        </button>
      </li>
    </>
  );
}
