import axios from "axios";
import { getToken } from "../util/auth";
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export async function fetchComment(id) {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_ENDPOINT}comment`,
    headers: {},
    params: { id },
  };
  try {
    const response = await axios.request(config);
    return response.data.data;
  } catch (error) {
    console.error("❌❌❌ Error fetching products:", error); // Log lỗi
    return null;
  }
}

export async function fetchDetailProduct(slug) {
  try {
    const response = await axios.get(`${API_ENDPOINT}product/${slug}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching:", error);

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

export async function pulishComment(formDataToSend) {
  const Token = getToken();

  try {
    const response = await axios.post(
      `${API_ENDPOINT}pulish-comment`,
      formDataToSend,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data; // Trả về dữ liệu mong muốn
  } catch (error) {
    console.error("Lỗi khi gửi dữ liệu:", error);
    return null; // Tránh lỗi khi gọi hàm
  }
}

export async function fetchProductRelate(cate, id) {
  const Token = getToken();

  try {
    // Chờ axios lấy dữ liệu
    const response = await axios.get(
      `${API_ENDPOINT}product-relate?category=${cate}&id=${id}`,
    );

    return response.data; // Trả về dữ liệu mong muốn
  } catch (error) {
    console.error("Lỗi khi gửi dữ liệu:", error);
    return null; // Tránh lỗi khi gọi hàm
  }
}
