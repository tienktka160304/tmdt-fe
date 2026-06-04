import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFavorites, addFavorite, removeFavorite } from "../api/yeuthich";
import Swal from "sweetalert2";

// Thunk để lấy danh sách sản phẩm yêu thích từ API
export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFavorites();
      return response.success
        ? response.data
        : rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Thunk để thêm sản phẩm vào danh sách yêu thích
export const addFavoriteProduct = createAsyncThunk(
  "favorites/addFavoriteProduct",
  async (productId, { dispatch }) => {
    await addFavorite(productId);
    dispatch(fetchFavorites()); // Gọi lại danh sách yêu thích sau khi thêm
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Thêm yêu thích",
    });
  },
);

// Thunk để xóa sản phẩm khỏi danh sách yêu thích
export const removeFavoriteProduct = createAsyncThunk(
  "favorites/removeFavoriteProduct",
  async (productId, { dispatch }) => {
    await removeFavorite(productId);

    dispatch(fetchFavorites()); // Gọi lại danh sách yêu thích sau khi xóa
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Bỏ yêu thích",
    });
  },
);

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default favoriteSlice.reducer;
