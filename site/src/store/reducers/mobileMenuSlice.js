import { createSlice } from "@reduxjs/toolkit";

const mobileMenuSlice = createSlice({
  name: "setting",
  initialState: {
    folded: false,
  },
  reducers: {
    toggle(state) {
      state.folded = !state.folded;
    },
  },
});

export const mobileMenuFoldedSelector = (state) => state.mobileMenu.folded;

export const { toggle } = mobileMenuSlice.actions;

export default mobileMenuSlice.reducer;
