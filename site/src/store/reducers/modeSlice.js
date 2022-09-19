import { createSlice } from "@reduxjs/toolkit";
import { CACHE_KEY } from "../../utils/constants";
import { getCookie, setCookie } from "../../utils/viewFuncs/cookie";

const mode = Object.freeze({
  light: "light",
  dark: "dark",
});

export function getInitMode() {
  let result;
  try {
    result = getCookie(CACHE_KEY.themeMode) ?? mode.light;
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
      if (getCookie(CACHE_KEY.themeMode) !== payload) {
        setCookie(CACHE_KEY.themeMode, payload);
      }
      // console.log(payload,111)
      state.mode = payload;
    },
  },
});

export const modeSelector = (state) => state.mode.mode;

export const { setMode } = settingSlice.actions;

export default settingSlice.reducer;
