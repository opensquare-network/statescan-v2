import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import { runtimeListApi } from "../../services/urls";

const name = "runtime";

const runtimeSlice = createSlice({
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

export const { setList, setListLoading, setDetail } = runtimeSlice.actions;

export const runtimeListSelector = (state) => state[name].list;
export const runtimeListLoadingSelector = (state) => state[name].listLoading;
export const runtimeDetailSelector = (state) => state[name].detail;

export const runtimeFetchList =
  (page, pageSize, params, fetchOptions) => async (dispatch) => {
    dispatch(setListLoading(true));

    return api
      .fetch(runtimeListApi, { page, pageSize, ...params }, fetchOptions)
      .then(({ result }) => {
        if (result) {
          dispatch(setList(result));
        }
      })
      .finally(() => {
        dispatch(setListLoading(false));
      });
  };

export const clearRuntimeList = () => (dispatch) => {
  dispatch(setList(null));
};

export default runtimeSlice.reducer;
