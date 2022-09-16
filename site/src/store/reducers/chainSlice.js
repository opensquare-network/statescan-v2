import { createSlice } from "@reduxjs/toolkit";

const chainSlice = createSlice({
  name: "chain",
  initialState: {
    scanHeight: 0,
    overview: null,
    isLoading: true,
  },
  reducers: {
    setScanHeight(state, { payload }) {
      state.scanHeight = payload;
    },
    setOverview(state, { payload }) {
      state.overview = payload;
      state.isLoading = false;
    },
  },
});

export const { setScanHeight, setOverview } = chainSlice.actions;

export const scanHeightSelector = (state) => state.chain.scanHeight;
export const overviewSelector = (state) => state.chain.overview;
export const isLoadingSelector = (state) => state.chain.isLoading;

export default chainSlice.reducer;
