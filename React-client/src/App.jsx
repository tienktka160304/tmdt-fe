import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { action as LoginSignUpAction } from "./pages/Auth/ActionAuth.jsx";
import { loader as loaderDetail } from "./pages/DetailProduct";
import NewsDetail, {
  loader as loaderNews,
} from "./pages/tintuc/PageNewsDetail.jsx";
import { categoryLoader } from "./loader/CategoryLoader.jsx";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Categorys from "./pages/Categorys";
import Cart from "./pages/Cart.jsx";
import SearchResults from "./pages/Search.jsx";
import CheckOut from "./pages/Auth/CheckOut.jsx";
import Error from "./pages/Error.jsx";
import ManagerUser from "./pages/Auth/ManagerUser.jsx";
import InfoAccout from "./pages/Auth/managerUser/InfoAccout.jsx";
import DanhGiaWeb from "./pages/Auth/managerUser/DanhGiaWeb.jsx";
import EditAccout from "./pages/Auth/managerUser/EditAccout.jsx";
import CheckOutFinal from "./pages/Auth/CheckOutFinal.jsx";
import ProductsLike from "./pages/ProductsLike.jsx";
import ChangePassword from "./pages/Auth/managerUser/EditPassword.jsx";
import Layout from "./pages/tintuc/Layout.jsx";
import NewsCategory from "./pages/tintuc/PageNewsCategory.jsx";
import About from "./pages/About.jsx";
import LienHe from "./pages/LienHe.jsx";
import HistoryOrder from "./pages/Auth/HistoryOrder.jsx";
import { loader as loaderHistoryOrder } from "./pages/Auth/HistoryOrder.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import WithKeyedDetailProduct from "./pages/WithKeyedDetailProduct.jsx";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "/san-pham", element: <Categorys />, loader: categoryLoader },
      { path: "/cart", element: <Cart /> },
      { path: "/gioi-thieu", element: <About /> },
      { path: "/lien-he", element: <LienHe /> },
      { path: "/search", element: <SearchResults /> },
      {
        path: "/chi-tiet",
        element: <WithKeyedDetailProduct />,
        loader: loaderDetail,
      },
      { path: "/forgot-pass", element: <ForgotPassword /> },
      {
        path: "/tin-tuc",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <NewsCategory />,
          },
          {
            path: "chi-tiet-tin",
            element: <NewsDetail />,
            loader: loaderNews,
          },
        ],
      },
      // auth
      { path: "/yeu-thich", element: <ProductsLike /> },
      {
        path: "/lich-su-mua-hang",
        element: <HistoryOrder />,
        loader: loaderHistoryOrder,
      },

      {
        path: "/manager-user",
        element: <ManagerUser />,
        children: [
          { index: true, element: <InfoAccout /> },
          { path: "edit-accout", element: <EditAccout /> },
          { path: "edit-password", element: <ChangePassword /> },
          { path: "danh-gia", element: <DanhGiaWeb /> },
        ],
      },
      { path: "/check-out", element: <CheckOut /> },
      { path: "/check-out/:id", element: <CheckOutFinal /> },
      {
        path: "/auth",
        action: LoginSignUpAction,
      },
    ],
  },
]);

function App() {
  useEffect(() => {
    Aos.init({
      duration: 500,
      easing: "ease-in-sine",
      offset: 20,
      mirror: false,
      // anchorPlacement: "top-bottom",
    });
  }, []);
  return <RouterProvider router={router} />;
}
export default App;
