import { GoDotFill } from "react-icons/go";
import BtnAnimation from "./BtnAnimation";

export default function BtnLoadingSubmit({
  isPending,
  typebtn,
  defaultText,
  loadingText,
}) {
  return (
    <>
      <BtnAnimation>
        <button
          disabled={isPending}
          type={typebtn}
          className={`mb-4 inline-flex w-full justify-center rounded-lg bg-primary px-4 py-2.5 text-base font-semibold text-white hover:bg-slate-900 disabled:cursor-not-allowed disabled:bg-gray-400`}
        >
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <svg
                className="h-5 w-5 animate-spin text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>

              {loadingText}
              <p className="text-sm">
                <span className="inline-block animate-bounce [animation-delay:0ms]">
                  <GoDotFill className="text-[9px]" />
                </span>
                <span className="inline-block animate-bounce [animation-delay:100ms]">
                  <GoDotFill className="text-[9px]" />
                </span>
                <span className="inline-block animate-bounce [animation-delay:200ms]">
                  <GoDotFill className="text-[9px]" />
                </span>
              </p>
            </div>
          ) : (
            defaultText
          )}
        </button>
      </BtnAnimation>
    </>
  );
}
