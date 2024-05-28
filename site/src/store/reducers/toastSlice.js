import { createSlice } from "@reduxjs/toolkit";

const MAX_TOASTS = 6;
let count = 0;

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    toasts: [],
  },
  reducers: {
    addToast(state, { payload }) {
      const toastId = count++;
      if (state.toasts.length >= MAX_TOASTS) {
        state.toasts.shift();
      }
      state.toasts.push({ id: toastId, ...payload });
    },
    removeToast(state, { payload }) {
      state.toasts = state.toasts.filter((item) => item.id !== payload);
    },
  },
});

export const toastsSelector = (state) => state.toast.toasts;

export const { addToast, removeToast } = toastSlice.actions;

export default toastSlice.reducer;
