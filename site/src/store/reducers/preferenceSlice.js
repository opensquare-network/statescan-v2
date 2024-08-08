import { createSlice } from "@reduxjs/toolkit";
import { timeTypes } from "../../utils/constants";

const DEFAULT_TIMETYPE = timeTypes.age;

const preferenceSlice = createSlice({
  name: "preference",
  initialState: {
    timeType: DEFAULT_TIMETYPE,
    tableSwitchFirst: true,
  },
  reducers: {
    setTimeType(state, { payload }) {
      state.timeType = payload;
      localStorage.setItem("timeType", payload);
    },
    setTableSwitchFirst(state, { payload }) {
      state.tableSwitchFirst = payload;
    },
  },
});

export const { setTimeType, setTableSwitchFirst } = preferenceSlice.actions;

export const timeTypeSelector = (state) => state.preference.timeType;
export const tableSwitchFirstSelector = (state) =>
  state.preference.tableSwitchFirst;

export default preferenceSlice.reducer;
