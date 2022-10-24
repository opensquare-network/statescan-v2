import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    latestBlocks: [],
    latestSignedTransfers: [],
    overview: {},
  },
  reducers: {
    setLatestBlocks(state, { payload }) {
      state.latestBlocks = payload;
    },
    setLatestSignedTransfers(state, { payload }) {
      state.latestSignedTransfers = payload;
    },
    setOverview(state, { payload }) {
      state.overview = payload;
    },
  },
});

export const { setLatestBlocks, setLatestSignedTransfers, setOverview } =
  socketSlice.actions;
export const latestBlocksSelector = (state) => state.socket.latestBlocks;
export const latestSignedTransfersSelector = (state) =>
  state.socket.latestSignedTransfers;
export const overviewSelector = (state) => state.socket.overview;

export default socketSlice.reducer;
