import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import { callApi } from "../../services/urls";

const name = "call";

const callSlice = createSlice({
  name,
  initialState: {
    detail: null,
  },
  reducers: {
    setDetail(state, { payload }) {
      state.detail = payload;
    },
  },
});

export const { setDetail } = callSlice.actions;

export const callDetailSelector = (state) => state[name].detail;

export const callFetchDetail = (id) => async (dispatch) => {
  return api.fetch(callApi(id)).then(({ result }) => {
    if (result) {
      dispatch(setDetail(result));
    }
  });
};
export const resetCallDetail = () => (dispatch) => {
  dispatch(setDetail(null));
};

export default callSlice.reducer;
