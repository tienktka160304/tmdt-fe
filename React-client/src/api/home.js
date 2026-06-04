import axios from "axios";
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export async function fetchBannerOne() {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_ENDPOINT}banner?position=1`,
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

export async function fetchBannerTwo() {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_ENDPOINT}banner?position=2`,
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

export async function fetchBannerThree() {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_ENDPOINT}banner?position=3`,
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

export async function fetchProductHotLimitFour() {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_ENDPOINT}product?ct=hot&limit=4`,
    headers: {},
  };
  try {
    const response = await axios.request(config);
    return response.data.data;
  } catch (error) {
    console.error("❌❌❌ Error fetching products:", error);
    return null;
  }
}

export async function fetchProductFlashsale() {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_ENDPOINT}flashSale`,
    headers: {},
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("❌❌❌ Error fetching products:", error);
    return null;
  }
}

// ⭐⭐⭐ lay san pham ban cha
export async function fetchProductBestSellingBike() {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_ENDPOINT}product?ct=best-selling&limit=8`,
    headers: {},
  };
  try {
    const response = await axios.request(config);

    return response.data.data;
  } catch (error) {
    console.error("❌❌❌ Error fetching products:", error);
    return null;
  }
}

export async function fetchProductBestSellingPhuKien() {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_ENDPOINT}product?mainCate=3&ct=best-selling&limit=8`,
    headers: {},
  };
  try {
    const response = await axios.request(config);

    return response.data.data;
  } catch (error) {
    console.error("❌❌❌ Error fetching products:", error);
    return null;
  }
}

export async function fetchPostsBaiviet() {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_ENDPOINT}post`,
    headers: {},
  };

  try {
    const response = await axios.request(config);
    return response.data.data;
  } catch (error) {
    console.error("❌❌❌ Error fetching post:", error);
    return null;
  }
}

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
