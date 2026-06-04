import axios from "axios";
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export async function fetchProductPageCategory(params = {}) {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_ENDPOINT}productscategory`,
    headers: {},
    params,
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("❌❌❌ Error fetching products:", error);
    return null;
  }
}

//home cung dung
export async function fetchSubCategory() {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_ENDPOINT}category`,
    headers: {},
  };
  try {
    const response = await axios.request(config);
    return response.data.data;
  } catch (error) {
    console.error("❌❌❌ Error fetching category:", error);
    return null;
  }
}

export async function fetchDoiTuong() {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_ENDPOINT}customersegment`,
    headers: {},
  };

  try {
    const response = await axios.request(config);
    return response.data.data;
  } catch (error) {
    console.error("❌❌❌ Error fetching category:", error);
    return null;
  }
}

export async function fetchCategoryWithSub() {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_ENDPOINT}mainCategoryWithSub`,
    headers: {},
  };

  try {
    const response = await axios.request(config);
    return response.data.data;
  } catch (error) {
    console.error("❌❌❌ Error fetching category:", error);
    return null;
  }
}

// home cung dung
export async function fetchBrand() {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_ENDPOINT}brand`,
    headers: {},
  };

  try {
    const response = await axios.request(config);
    return response.data.data;
  } catch (error) {
    console.error("❌❌❌ Error fetching Brand:", error);
    return null;
  }
}
