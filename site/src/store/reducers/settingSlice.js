import { createSlice } from "@reduxjs/toolkit";
import { CACHE_KEY } from "../../utils/constants";

const mode = Object.freeze({
  light: "light",
  dark: "dark",
});

export function getInitMode() {
  let result;
  try {
    result = localStorage.getItem(CACHE_KEY.themeMode) ?? mode.light;
  } catch (e) {
    // ignore parse error
    result = mode.light;
  }

  return result;
}

const settingSlice = createSlice({
  name: "setting",
  initialState: {
    mode: getInitMode(),
  },
  reducers: {
    setMode(state, { payload }) {
      localStorage.setItem(CACHE_KEY.themeMode, payload);
      state.mode = payload;
    },
  },
});

export const modeSelector = (state) => state.setting.mode;

export const { setMode } = settingSlice.actions;

export default settingSlice.reducer;
