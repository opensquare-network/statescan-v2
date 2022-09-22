import { createSlice } from "@reduxjs/toolkit";

const mobileMenuSlice = createSlice({
  name: "setting",
  initialState: {
    folded: true,
  },
  reducers: {
    toggle(state) {
      state.folded = !state.folded;
    },
    closeMobileMenu(state) {
      state.folded = true;
    },
  },
});

export const mobileMenuFoldedSelector = (state) => state.mobileMenu.folded;

export const { toggle, closeMobileMenu } = mobileMenuSlice.actions;

export default mobileMenuSlice.reducer;
