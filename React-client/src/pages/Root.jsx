import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";
import { useEffect, useLayoutEffect } from "react";
import ModalLogin from "./Auth/ModalLogin";
import { useDispatch, useSelector } from "react-redux";
import { checkToken } from "../api/user";
import { getToken } from "../util/auth";
import { fetchFavorites } from "../store/favoriteSlice";
import { popupAuthAction } from "../store";

export default function Root() {
  const [searchParams, setSearchParams] = useSearchParams();
  const ispopUp = useSelector((state) => state.popupAuth.popUp);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    async function kt() {
      const { valid } = await checkToken();
      if (!valid) {
        window.location.reload();
      } else {
        dispatch(fetchFavorites());
      }
    }

    if (getToken()) {
      kt();
    }
  }, []);

  useEffect(() => {
    if (searchParams.get("adp") === "true") {
      if (!getToken()) {
        dispatch(popupAuthAction.SHOW_POPUP());
      }

      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams, dispatch]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      {!ispopUp ? "" : <ModalLogin />}
    </>
  );
}
