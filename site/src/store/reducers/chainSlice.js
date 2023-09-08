import { createSlice } from "@reduxjs/toolkit";

const chainSlice = createSlice({
  name: "chain",
  initialState: {
    finalizedHeight: 0,
  },
  reducers: {
    setFinalizedHeight(state, { payload }) {
      state.finalizedHeight = payload;
    },
  },
});

export const finalizedHeightSelector = (state) => state.chain.finalizedHeight;

export const { setFinalizedHeight } = chainSlice.actions;

export default chainSlice.reducer;
