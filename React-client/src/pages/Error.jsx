import { NavLink, useRouteError } from "react-router-dom";
import { useEffect } from "react";
import BtnAnimation from "../component/shared/BtnAnimation";

export default function Error() {
  useEffect(() => {
    document.title = `Error | ${import.meta.env.VITE_WEBSITE_NAME}`;
  }, []);

  const error = useRouteError();

  let title = "Lỗi !";
  let message = "Đã xảy ra lỗi";

  if (error.status === 505) {
    title = ` ${error.status}`;
    message = error.data.message;
  }

  if (error.status === 404) {
    title = ` ${error.status}`;
    message = error.data.message;
  }

  return (
    <>
      <section className="container">
        <div className="img_error">
          <h2 className="text-center text-7xl font-bold leading-10">{title}</h2>
        </div>
        <p className="text-center text-4xl font-bold leading-10">{message}</p>

        <div className="pt-10 text-center">
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
    </>
  );
}
