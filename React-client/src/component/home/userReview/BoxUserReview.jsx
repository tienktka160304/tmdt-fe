export default function BoxUserReview({ item }) {
  return (
    <div className="flex w-full justify-center">
      <div className="block w-full rounded-lg bg-white p-6 shadow-lg">
        <div className="min-h-[200px] items-center md:flex md:flex-row">
          <img
            src={` ${item.user?.avatar ? import.meta.env.VITE_ENDPOINT + item.user?.avatar : "18.png"}`}
            alt="avater"
            onError={(e) => {
              e.target.src = "18.png";
            }}
            className="h-14 w-14 overflow-hidden rounded-full object-cover shadow"
          />

          <div className="md:ms-6">
            <p className="mb-6 font-light italic text-neutral-500">
              <span className="inline-block pe-2 [&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 448 512"
                >
                  <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" />
                </svg>
              </span>
              {item.content}
            </p>
            <p className="mb-2 text-xl font-semibold text-neutral-800 dark:text-neutral-200">
              {item.user?.last_name} {item.user?.first_name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
