import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filters: null,
  },
  reducers: {
    setFilters(state, { payload }) {
      state.filters = payload;
    },
  },
});

export const filtersSelector = (state) => state.filter.filters;

export const { setFilters } = filterSlice.actions;

export const fetchSpecsFilter = () => async (dispatch) => {
  return api.fetch(`/specs/filter`).then(({ result }) => {
    if (result) {
      dispatch(setFilters(result));
    }
  });
};

export default filterSlice.reducer;
