import { getToken, getUser, removeTokenUser } from "../util/auth";
import axios from "axios";
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export async function postLogin(authData) {
  try {
    const response = await axios.post(`${API_ENDPOINT}login`, authData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    if (error.response) {
      return {
        error: error,
        status: error.response.status,
        message: error.response.data.message || "Đăng nhập thất bại!",
      };
    }
  }
}

export async function postRegister(authData) {
  try {
    const response = await axios.post(`${API_ENDPOINT}register`, authData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.log(error);
    if (error.response) {
      return {
        status: error.response.status,
        message: error.response.data.errors || "Đăng ký thất bại!",
      };
    }
  }
}

export async function forgotPass(email) {
  try {
    const response = await axios.post(
      `${API_ENDPOINT}forgot-password`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return {
      success: true,
      data: response.data.message,
    };
  } catch (error) {
    console.log(error);

    if (error.response) {
      return {
        success: false,
        status: error.response.status,
        message: error.response.data.message || "Có lỗi xảy ra!",
      };
    }

    return {
      success: false,
      message: "Không thể kết nối đến máy chủ!",
    };
  }
}

export async function fetchLogout() {
  try {
    const token = getToken();

    if (!token) {
      console.error("Token không tồn tại!");
      return;
    }

    const response = await axios.post(
      `${API_ENDPOINT}logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    removeTokenUser();

    window.location.href = "/";
  } catch (error) {
    console.error("Lỗi khi đăng xuất:", error.response?.data || error.message);
  }
}

export async function updateUser(formDataToSend) {
  const Token = getToken();

  try {
    const response = await axios.post(
      `${API_ENDPOINT}updateUser`,
      formDataToSend,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        status: error.response.status,
        message: error.response.data.errors || "Đăng ký thất bại!",
      };
    }
  }
}

export async function fetchUserActive() {
  const Token = getToken();
  const User = getUser();
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_ENDPOINT}getUserActive?id=${User.id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    removeTokenUser();
    return { valid: false };
  }
}

export async function checkToken() {
  const Token = getToken();
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_ENDPOINT}check-token`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
  };
  try {
    const response = await axios.request(config);

    return response.data;
  } catch (error) {
    removeTokenUser();
    return { valid: false };
  }
}

export async function changePassword(data) {
  try {
    const response = await axios.post(`${API_ENDPOINT}change-password`, data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return { success: true, message: response.data.message };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Đổi mật khẩu thất bại!",
    };
  }
}

//

export async function postReviewWeb(data) {
  const Token = getToken();
  try {
    const response = await axios.post(`${API_ENDPOINT}post-review-web`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.log(error);
    if (error.response) {
      return {
        status: error.response.status,
        message: error.response.data.errors || "thất bại!",
      };
    }
  }
}

export async function getReviewWeb() {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API_ENDPOINT}get-review-web`,
  };
  try {
    const response = await axios.request(config);

    return response.data;
  } catch (error) {}
}
