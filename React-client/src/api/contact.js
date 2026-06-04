import axios from "axios";
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export async function sendContactForm(formData) {
  try {
    const response = await axios.post(`${API_ENDPOINT}contact`, formData);

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);

    if (error.response) {
      return {
        success: false,
      };
    }
  }
}
