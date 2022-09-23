import { createSlice } from "@reduxjs/toolkit";
import { timeTypes } from "../../utils/constants";

const DEFAULT_TIMETYPE = timeTypes.age;

const preferenceSlice = createSlice({
  name: "preference",
  initialState: {
    timeType: DEFAULT_TIMETYPE,
  },
  reducers: {
    setTimeType(state, { payload }) {
      state.timeType = payload;
      localStorage.setItem("timeType", payload);
    },
  },
});

export const { setTimeType } = preferenceSlice.actions;

export const timeTypeSelector = (state) => state.preference.timeType;

export default preferenceSlice.reducer;
