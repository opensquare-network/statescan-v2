import { createSlice } from "@reduxjs/toolkit";

const tooltipSlice = createSlice({
  name: "tooltip",
  initialState: {
    showTip: false,
    text: "",
    position: { left: 0, top: 0 },
  },
  reducers: {
    toggleTooltip(state, { payload }) {
      state.showTip = payload;
    },
    setText(state, { payload }) {
      state.text = payload;
    },
    setPosition(state, { payload }) {
      state.position = payload;
    },
  },
});

export const tooltipShowSelector = (state) => state.tooltip.showTip;
export const tooltipContentSelector = (state) => state.tooltip.text;
export const tooltipPositionSelector = (state) => state.tooltip.position;

export const { setText, setPosition, toggleTooltip } = tooltipSlice.actions;

export default tooltipSlice.reducer;
