import axios from "axios";
import { getToken } from "../util/auth";
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export async function fetchHistoryOrder() {
  const token = getToken();
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_ENDPOINT}history-orders`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.request(config);

    console.log("PAYMENT API:", response.data);

    return response.data.payments || [];
  } catch (error) {
    console.error("❌ Error fetching payment:", error);
    return [];
  }
}

export async function CancelOrder(id) {
  const token = getToken();
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_ENDPOINT}cancel-order/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.request(config);
    return { data: response.data, status: true }; // Trả về dữ liệu mong muốn
  } catch (error) {
    return { data: error.response.data, status: false }; // Trả về lỗi nếu có
  }
}
