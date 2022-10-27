import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import { callApi, callListApi } from "../../services/urls";

const name = "call";

const callSlice = createSlice({
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

export const { setDetail, setList, setListLoading } = callSlice.actions;

export const callListSelector = (state) => state[name].list;
export const callListLoadingSelector = (state) => state[name].listLoading;
export const callDetailSelector = (state) => state[name].detail;

export const callFetchList =
  (page, pageSize, params, fetchOptions) => async (dispatch) => {
    dispatch(setListLoading(true));

    return api
      .fetch(callListApi, { page, pageSize, ...params }, fetchOptions)
      .then(({ result }) => {
        if (result) {
          dispatch(setList(result));
        }
      })
      .finally(() => {
        dispatch(setListLoading(false));
      });
  };
export const cleanCallList = () => (dispatch) => {
  dispatch(setList(null));
};

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
