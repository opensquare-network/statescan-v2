import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filters: null,
    currentFilterValue: {},
  },
  reducers: {
    setFilters(state, { payload }) {
      state.filters = payload;
    },
    setCurrentFilterValue(state, { payload }) {
      state.currentFilterValue = payload;
    },
  },
});

export const filtersSelector = (state) => state.filter.filters;
export const currentFilterValueSelector = (state) =>
  state.filter.currentFilterValue;

export const { setFilters, setCurrentFilterValue } = filterSlice.actions;

export const fetchSpecsFilter = () => async (dispatch) => {
  return api.fetch(`/specs/filter`).then(({ result }) => {
    if (result) {
      dispatch(setFilters(result));
    }
  });
};

export default filterSlice.reducer;
