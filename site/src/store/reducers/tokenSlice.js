import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import { tokenListApi } from "../../services/urls";

const name = "token";

const tokenSlice = createSlice({
  name,
  initialState: {
    list: null,
    listLoading: false,
  },
  reducers: {
    setList(state, { payload }) {
      state.list = payload;
    },
    setListLoading(state, { payload }) {
      state.listLoading = payload;
    },
  },
});

export const { setList, setListLoading } = tokenSlice.actions;

export const tokenListSelector = (state) => state[name].list;
export const tokenListLoadingSelector = (state) => state[name].listLoading;

export const tokenFetchList =
  (page, pageSize, params, options) => async (dispatch) => {
    dispatch(setListLoading(true));

    return api
      .fetch(tokenListApi, { page, pageSize, ...params }, options)
      .then(({ result }) => {
        if (result) {
          dispatch(setList(result));
        }
      })
      .finally(() => {
        dispatch(setListLoading(false));
      });
  };

export const clearTokenList = () => (dispatch) => {
  dispatch(setList(null));
};

export default tokenSlice.reducer;
