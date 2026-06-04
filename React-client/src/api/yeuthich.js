//yeu thich
import { getToken } from "../util/auth";
import axios from "axios";
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export async function addFavorite(productId) {
  try {
    const token = getToken();
    if (!token) {
      return { success: false, message: "Bạn chưa đăng nhập!" };
    }

    const response = await axios.post(
      `${API_ENDPOINT}favorite/add`,
      { id_product: productId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return { success: true, data: response.data };
  } catch (error) {
    if (error.status == 401) {
      window.location.reload();
    }
    return {
      success: false,
      message: error.response?.data?.message || "Có lỗi xảy ra!",
    };
  }
}

export async function removeFavorite(productId) {
  try {
    const token = getToken();
    if (!token) {
      return { success: false, message: "Bạn chưa đăng nhập!" };
    }

    const response = await axios.delete(`${API_ENDPOINT}favorite/remove`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: { id_product: productId }, // Phải để trong `data` cho DELETE method
    });

    return { success: true, data: response.data };
  } catch (error) {
    if (error.status == 401) {
      window.location.reload();
    }
    return {
      success: false,
      message: error.response?.data?.message || "Có lỗi xảy ra!",
    };
  }
}

export async function getFavorites() {
  try {
    const token = getToken();
    if (!token) {
      return { success: false, message: "Bạn chưa đăng nhập!" };
    }

    const response = await axios.get(`${API_ENDPOINT}favorite/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: response.data.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Có lỗi xảy ra!",
    };
  }
}
