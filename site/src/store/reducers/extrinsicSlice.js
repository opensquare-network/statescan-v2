import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import { extrinsicApi } from "../../services/urls";

const name = "extrinsic";

const extrinsicSlice = createSlice({
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

export const { setDetail } = extrinsicSlice.actions;

export const extrinsicDetailSelector = (state) => state[name].detail;

export const extrinsicFetchDetail = (id) => async (dispatch) => {
  return api.fetch(extrinsicApi(id)).then(({ result }) => {
    if (result) {
      dispatch(setDetail(result));
    }
  });
};
export const resetExtrinsicDetail = () => (dispatch) => {
  dispatch(setDetail(null));
};

export default extrinsicSlice.reducer;
