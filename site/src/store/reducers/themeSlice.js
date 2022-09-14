import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: null,
  },
  reducers: {
    setTheme(state, { payload }) {
      state.theme = payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export const themeSelector = (state) => state.theme.theme;

export default themeSlice.reducer;
