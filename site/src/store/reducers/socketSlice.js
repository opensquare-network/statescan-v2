import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    latestBlocks: [],
    latestSignedTransfers: [],
  },
  reducers: {
    setLatestBlocks(state, { payload }) {
      state.latestBlocks = payload;
    },
    setLatestSignedTransfers(state, { payload }) {
      state.latestSignedTransfers = payload;
    },
  },
});

export const { setLatestBlocks, setLatestSignedTransfers } =
  socketSlice.actions;
export const latestBlocksSelector = (state) => state.socket.latestBlocks;
export const latestSignedTransfersSelector = (state) =>
  state.socket.latestSignedTransfers;

export default socketSlice.reducer;
