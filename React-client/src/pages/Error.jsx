import { NavLink, useRouteError } from "react-router-dom";
import { useEffect } from "react";
import BtnAnimation from "../component/shared/BtnAnimation";

export default function Error() {
  const error = useRouteError();

  useEffect(() => {
    document.title = `Error | ${import.meta.env.VITE_WEBSITE_NAME}`;
  }, []);

  const message =
    typeof error?.data === "string"
      ? error.data
      : error?.data?.message || error?.message || "Đã xảy ra lỗi";

  return (
    <section className="container text-center">
      <div className="img_error">
        <h2 className="text-center text-7xl font-bold leading-10">Lỗi !</h2>
      </div>

      <p className="text-center text-4xl font-bold leading-10">
        {String(message)}
      </p>

      <div className="pt-10">
        <BtnAnimation>
          <NavLink
            to="/"
            className="rounded bg-secondary px-8 py-2 font-semibold text-white"
          >
            Về trang chủ
          </NavLink>
        </BtnAnimation>
      </div>
    </section>
  );
}
