import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import BtnAnimation from "./BtnAnimation";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  displayRange = 1,
}) {
  const pages = [];

  const startPage = Math.max(1, currentPage - displayRange);
  const endPage = Math.min(totalPages, currentPage + displayRange);

  if (startPage > 1) pages.push(1);
  if (startPage > 2) pages.push("...");

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < totalPages - 1) pages.push("...");
  if (endPage < totalPages) pages.push(totalPages);

  return (
    <div className="flex items-center justify-center space-x-2 rounded-lg p-2 text-base text-primary">
      <BtnAnimation>
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="h-9 w-9 rounded border py-1 text-center shadow-sm disabled:hidden"
        >
          <FaArrowLeft className="inline-block" />
        </button>
      </BtnAnimation>

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-2">
            ...
          </span>
        ) : (
          <React.Fragment key={index}>
            <BtnAnimation>
              <button
                className={`h-9 w-9 rounded border py-1 text-center shadow-sm ${
                  page === currentPage
                    ? "bg-primary font-medium text-white"
                    : ""
                }`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </BtnAnimation>
          </React.Fragment>
        ),
      )}

      <BtnAnimation>
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="h-9 w-9 rounded border py-1 text-center shadow-sm disabled:hidden"
        >
          <FaArrowRight className="inline-block" />
        </button>
      </BtnAnimation>
    </div>
  );
}
