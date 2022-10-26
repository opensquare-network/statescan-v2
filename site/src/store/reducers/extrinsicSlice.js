import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import { extrinsicApi, extrinsicListApi } from "../../services/urls";

const name = "extrinsic";

const extrinsicSlice = createSlice({
  name,
  initialState: {
    list: null,
    listLoading: false,
    detail: null,
  },
  reducers: {
    setList(state, { payload }) {
      state.list = payload;
    },
    setListLoading(state, { payload }) {
      state.listLoading = payload;
    },
    setDetail(state, { payload }) {
      state.detail = payload;
    },
  },
});

export const { setDetail, setList, setListLoading } = extrinsicSlice.actions;

export const extrinsicListSelector = (state) => state[name].list;
export const extrinsicListLoadingSelector = (state) => state[name].listLoading;
export const extrinsicDetailSelector = (state) => state[name].detail;

export const extrinsicFetchList =
  (page, pageSize, params, fetchOptions) => async (dispatch) => {
    dispatch(setListLoading(true));

    return api
      .fetch(extrinsicListApi, { page, pageSize, ...params }, fetchOptions)
      .then(({ result }) => {
        if (result) {
          dispatch(setList(result));
        }
      })
      .finally(() => {
        dispatch(setListLoading(false));
      });
  };
export const cleanExtrinsicList = () => (dispatch) => {
  dispatch(setList(null));
};

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
