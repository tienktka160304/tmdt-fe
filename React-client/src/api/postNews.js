import axios from "axios";
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export async function getMainPost() {
  try {
    const response = await axios.get(`${API_ENDPOINT}main-post`);

    return { success: true, data: response.data.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Có lỗi xảy ra!",
    };
  }
}

export async function getPost(params = {}) {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_ENDPOINT}post`,
    headers: {},
    params,
  };
  try {
    const response = await axios.request(config);

    return response.data.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Có lỗi xảy ra!",
    };
  }
}

export async function fetchDetailPost(slug) {
  try {
    const response = await axios.get(`${API_ENDPOINT}post/${slug}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching :", error);

    if (error.response) {
      console.log("Lỗi từ server:", error.response.data);
      console.log("Mã lỗi HTTP:", error.response.status);

      throw new Response(JSON.stringify(error.response.data), {
        status: error.response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    throw new Response(
      JSON.stringify({ message: "❌❌❌ Lỗi không xác định" }),
      {
        status: 505,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

export async function fetchHotViewsPost() {
  try {
    const response = await axios.get(`${API_ENDPOINT}hot-views-post`);
    return response.data;
  } catch (error) {
    console.error("Error fetching :", error);

    throw new Response(
      JSON.stringify({ message: "❌❌❌ Lỗi không xác định" }),
      {
        status: 505,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
