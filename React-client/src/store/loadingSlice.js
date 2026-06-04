import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    loadingCount: 0,
  },
  reducers: {
    startLoading: (state) => {
      state.loadingCount += 1;
    },
    stopLoading: (state) => {
      state.loadingCount = Math.max(0, state.loadingCount - 1);
    },
  },
});

export const { startLoading, stopLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
