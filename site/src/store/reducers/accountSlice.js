import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import { accountApi, accountListApi } from "../../services/urls";

const name = "account";

const accountSlice = createSlice({
  name,
  initialState: {
    list: null,
    listLoading: false,
    detail: null,
    detailLoading: false,
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
    setDetailLoading(state, { payload }) {
      state.detailLoading = payload;
    },
  },
});

export const { setList, setListLoading, setDetail, setDetailLoading } =
  accountSlice.actions;

export const accountListSelector = (state) => state[name].list;
export const accountListLoadingSelector = (state) => state[name].listLoading;
export const accountDetailSelector = (state) => state[name].detail;
export const accountDetailLoadingSelector = (state) =>
  state[name].detailLoading;

export const accountFetchList =
  (page, pageSize, params, fetchOptions) => async (dispatch) => {
    dispatch(setListLoading(true));

    return api
      .fetch(accountListApi, { page, pageSize, ...params }, fetchOptions)
      .then(({ result }) => {
        if (result) {
          dispatch(setList(result));
        }
      })
      .finally(() => {
        dispatch(setListLoading(false));
      });
  };
export const clearAccountList = () => (dispatch) => {
  dispatch(setList(null));
};

export const accountFetchDetail = (id) => async (dispatch) => {
  dispatch(setDetail(null));
  dispatch(setDetailLoading(true));

  return api
    .fetch(accountApi(id))
    .then(({ result }) => {
      if (result) {
        dispatch(setDetail(result));
      }
    })
    .finally(() => {
      dispatch(setDetailLoading(false));
    });
};
export const clearAccountDetail = () => (dispatch) => {
  dispatch(setDetail(null));
};

export default accountSlice.reducer;
