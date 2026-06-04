import axios from "axios";
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export async function fetchsearch(query, limit, page) {
  if (!query) return null;
  try {
    const response = await axios.get(
      `${API_ENDPOINT}search?q=${query}&limit=${limit}&page=${page}`,
    );
    return response;
  } catch (error) {
    return null;
  }
}
