import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import { accountApi, accountListApi } from "../../services/urls";
import {
  clearHttpError,
  handleApiError,
} from "../../utils/viewFuncs/errorHandles";

const name = "account";

const accountSlice = createSlice({
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

export const { setList, setListLoading, setDetail } = accountSlice.actions;

export const accountListSelector = (state) => state[name].list;
export const accountListLoadingSelector = (state) => state[name].listLoading;
export const accountDetailSelector = (state) => state[name].detail;

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
export const cleanAccountList = () => (dispatch) => {
  dispatch(setList(null));
};

export const accountFetchDetail = (id) => async (dispatch) => {
  clearHttpError(dispatch);

  return api
    .fetch(accountApi(id))
    .then(({ result }) => {
      if (result) {
        dispatch(setDetail(result));
      }
    })
    .catch((error) => {
      handleApiError(error, dispatch);
    });
};
export const resetAccountDetail = () => (dispatch) => {
  dispatch(setDetail(null));
};

export default accountSlice.reducer;
