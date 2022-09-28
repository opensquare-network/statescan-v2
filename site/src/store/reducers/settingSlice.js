import { createSelector, createSlice } from "@reduxjs/toolkit";
import { CACHE_KEY, chains } from "../../utils/constants";
import { getEnvChain } from "../../utils/env";

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
    chain: getEnvChain(),
  },
  reducers: {
    setMode(state, { payload }) {
      localStorage.setItem(CACHE_KEY.themeMode, payload);
      state.mode = payload;
    },
  },
});

export const modeSelector = (state) => state.setting.mode;
export const chainSelector = (state) => state.setting.chain;
export const chainSettingSelector = createSelector(chainSelector, (chain) => {
  const setting = chains.find((item) => item.value === chain);
  if (!setting) {
    throw new Error(`Can not find chain setting of ${chain}`);
  }

  return setting;
});

export const { setMode } = settingSlice.actions;

export default settingSlice.reducer;
