import { useCallback } from "react";
import {
  MdOutlineRadioButtonUnchecked,
  MdRadioButtonChecked,
} from "react-icons/md";
import { useSearchParams } from "react-router-dom";

export default function LabelPrice({ name, min, max, handleTypeChange }) {
  const [searchParams] = useSearchParams();

  const isActive = useCallback(() => {
    const currentMin = parseInt(searchParams.get("pricemin")) || 0;
    const currentMax = parseInt(searchParams.get("pricemax")) || null;

    return (
      currentMin === min &&
      (currentMax === max || (max === null && !searchParams.get("pricemax")))
    );
  }, [searchParams, min, max]);

  return (
    <>
      <li className="flex items-center py-1">
        <button
          className={`text-left text-sm font-normal capitalize text-black first-letter:uppercase hover:text-primary ${
            isActive() ? "font-semibold text-green-700" : ""
          }`}
          onClick={() => handleTypeChange(min, max)}
        >
          <span className="pr-2">
            {isActive() ? (
              <MdRadioButtonChecked className="inline-block text-lg md:text-xl" />
            ) : (
              <MdOutlineRadioButtonUnchecked className="inline-block text-lg md:text-xl" />
            )}
          </span>
          <span>{name}</span>
        </button>
      </li>
    </>
  );
}
