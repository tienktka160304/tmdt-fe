import { useLocation } from "react-router-dom";
import DetailProduct from "./DetailProduct";

export default function WithKeyedDetailProduct() {
  const location = useLocation();
  return <DetailProduct key={location.search} />;
}
