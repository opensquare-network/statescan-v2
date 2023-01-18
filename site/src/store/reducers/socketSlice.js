import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    latestBlocksLoading: true,
    latestBlocks: [],
    latestSignedTransfersLoading: true,
    latestSignedTransfers: [],
    popularNftClasses: [],
    popularNftClassesLoading: false,
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
    setPopularNftClasses(state, { payload }) {
      state.popularNftClasses = payload;
    },
    setPopularNftClassesLoading(state, { payload }) {
      state.popularNftClassesLoading = payload;
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
  setPopularNftClasses,
  setPopularNftClassesLoading,
  setOverview,
} = socketSlice.actions;
export const latestBlocksSelector = (state) => state.socket.latestBlocks;
export const latestBlocksLoadingSelector = (state) =>
  state.socket.latestBlocksLoading;
export const latestSignedTransfersSelector = (state) =>
  state.socket.latestSignedTransfers;
export const latestSignedTransfersLoadingSelector = (state) =>
  state.socket.latestSignedTransfersLoading;
export const popularNftClassesSelector = (state) =>
  state.socket.popularNftClasses;
export const popularNftClassesLoadingSelector = (state) =>
  state.socket.popularNftClassesLoading;
export const overviewSelector = (state) => state.socket.overview;

export default socketSlice.reducer;
