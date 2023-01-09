import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    latestBlocksLoading: false,
    latestBlocks: [],
    latestSignedTransfersLoading: false,
    latestSignedTransfers: [],
    overview: {},
  },
  reducers: {
    setLatestBlocksLoading(state, { payload }) {
      state.latestBlocksLoading = payload;
    },
    setLatestBlocks(state, { payload }) {
      state.latestBlocks = payload;
    },
    setLatestSignedTransfers(state, { payload }) {
      state.latestSignedTransfers = payload;
    },
    setLatestSignedTransfersLoading(state, { payload }) {
      state.latestSignedTransfersLoading = payload;
    },
    setOverview(state, { payload }) {
      state.overview = payload;
    },
  },
});

export const {
  setLatestBlocks,
  setLatestBlocksLoading,
  setLatestSignedTransfers,
  setLatestSignedTransfersLoading,
  setOverview,
} = socketSlice.actions;
export const latestBlocksSelector = (state) => state.socket.latestBlocks;
export const latestBlocksLoadingSelector = (state) =>
  state.socket.latestBlocksLoading;
export const latestSignedTransfersSelector = (state) =>
  state.socket.latestSignedTransfers;
export const latestSignedTransfersLoadingSelector = (state) =>
  state.socket.latestSignedTransfersLoading;
export const overviewSelector = (state) => state.socket.overview;

export default socketSlice.reducer;
