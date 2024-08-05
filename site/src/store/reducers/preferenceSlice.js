import { createSlice } from "@reduxjs/toolkit";
import { delayColumnType, timeTypes } from "../../utils/constants";

const DEFAULT_TIMETYPE = timeTypes.age;
const DEFAULT_DELAYTYPE = delayColumnType.blocks;

const preferenceSlice = createSlice({
  name: "preference",
  initialState: {
    timeType: DEFAULT_TIMETYPE,
    delayType: DEFAULT_DELAYTYPE,
  },
  reducers: {
    setTimeType(state, { payload }) {
      state.timeType = payload;
      localStorage.setItem("timeType", payload);
    },
    setDelayType(state, { payload }) {
      state.delayType = payload;
      localStorage.setItem("delayType", payload);
    },
  },
});

export const { setTimeType, setDelayType } = preferenceSlice.actions;

export const timeTypeSelector = (state) => state.preference.timeType;
export const delayTypeSelector = (state) => state.preference.delayType;

export default preferenceSlice.reducer;
