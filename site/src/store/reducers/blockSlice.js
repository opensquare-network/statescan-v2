import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import { blockApi, blockListApi } from "../../services/urls";

const name = "block";

const blockSlice = createSlice({
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

export const { setDetail, setList, setListLoading } = blockSlice.actions;

export const blockListSelector = (state) => state[name].list;
export const blockListLoadingSelector = (state) => state[name].listLoading;
export const blockDetailSelector = (state) => state[name].detail;

export const blockFetchList =
  (page, pageSize, params, fetchOptions) => async (dispatch) => {
    dispatch(setListLoading(true));

    return api
      .fetch(blockListApi, { page, pageSize, ...params }, fetchOptions)
      .then(({ result }) => {
        if (result) {
          dispatch(setList(result));
        }
      })
      .finally(() => {
        dispatch(setListLoading(false));
      });
  };
export const cleanBlockList = () => (dispatch) => {
  dispatch(setList(null));
};

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
