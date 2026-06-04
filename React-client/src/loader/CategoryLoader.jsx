import {
  fetchBrand,
  fetchCategoryWithSub,
  fetchDoiTuong,
} from "../api/productcategory";

export async function categoryLoader() {
  const category = await fetchCategoryWithSub();
  const brand = await fetchBrand();
  const doiTuong = await fetchDoiTuong();
  return { category, brand, doiTuong };
}
