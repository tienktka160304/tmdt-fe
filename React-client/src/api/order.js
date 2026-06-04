import { getToken } from "../util/auth";
import axios from "axios";
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export async function KTThanhToan(id) {
  const Token = getToken();
  try {
    const response = await axios.post(
      `${API_ENDPOINT}kt-thanh-toan`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Lỗi khi gửi dữ liệu:", error);
    return null;
  }
}

export async function fetchPayment() {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_ENDPOINT}payment`,
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

export async function postCart(ids) {
  try {
    const response = await axios.post(
      `${API_ENDPOINT}cartproduct`,
      { ids: Array.isArray(ids) ? ids : [ids] },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    if (error.response) {
      return {
        status: error.response.status,
        message: error.response.data.errors || "Đăng ký thất bại!",
      };
    }
  }
}

export async function postOrder(orderData, Token) {
  try {
    const response = await axios.post(`${API_ENDPOINT}order`, orderData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
    });

    return {
      data: response.data,
    };
  } catch (error) {
    let message = "Lỗi hệ thống! Vui lòng thử lại sau.";
    if (error.response) {
      message = error.response.data.errors || "Đặt hàng thất bại!";
    }

    alert(message);

    return {
      success: false,
      status: error.response?.status || 500,
      message,
    };
  }
}

export async function getOrderByid(id, Token) {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_ENDPOINT}check-out-online?id=${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
  };
  try {
    const response = await axios.request(config);

    return response.data.data;
  } catch (error) {
    console.error("❌❌❌ Error fetching order:", error);
    return null;
  }
}
