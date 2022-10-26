import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import { blockApi } from "../../services/urls";

const name = "block";

const blockSlice = createSlice({
  name,
  initialState: {
    detail: null,
    eventsTable: {},
    callsTable: {},
  },
  reducers: {
    setDetail(state, { payload }) {
      state.detail = payload;
    },
  },
});

export const { setDetail } = blockSlice.actions;

export const blockDetailSelector = (state) => state[name].detail;

export const blockFetchDetail = (id) => async (dispatch) => {
  return api.fetch(blockApi(id)).then(({ result }) => {
    if (result) {
      dispatch(setDetail(result));
    }
  });
};
export const resetBlockDetail = () => (dispatch) => {
  dispatch(setDetail(null));
};

export default blockSlice.reducer;
