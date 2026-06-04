import { memo } from "react";
import { NavLink } from "react-router-dom";
function Breadcrumb({ nav1, nav2, nav1Link, nav2Link, navEnd }) {
  return (
    <>
      <section className="bg-gray-100 py-4">
        <div className="container flex items-center justify-between text-gray-700">
          <nav className="text-xs font-medium leading-5 md:text-sm">
            <ol className="flex flex-wrap">
              <li>
                <NavLink className="hover:text-green-600" to="/">
                  Trang chủ
                </NavLink>
              </li>
              {nav1Link && (
                <>
                  <li>
                    <span className="mx-2">/</span>
                  </li>
                  <li>
                    <NavLink className="hover:text-green-600" to={nav1Link}>
                      {nav1}
                    </NavLink>
                  </li>
                </>
              )}
              {nav2Link && (
                <>
                  <li>
                    <span className="mx-2">/</span>
                  </li>
                  <li>
                    <NavLink className="hover:text-green-600" to={nav2Link}>
                      {nav2}
                    </NavLink>
                  </li>
                </>
              )}

              {navEnd && (
                <>
                  <li>
                    <span className="mx-2">/</span>
                  </li>
                  <li className="text-gray-400">{navEnd}</li>
                </>
              )}
            </ol>
          </nav>
        </div>
      </section>
    </>
  );
}

export default memo(Breadcrumb);
