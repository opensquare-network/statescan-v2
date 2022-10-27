import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import { accountListApi } from "../../services/urls";

const name = "account";

const accountSlice = createSlice({
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

export const { setList, setListLoading } = accountSlice.actions;

export const accountListSelector = (state) => state[name].list;
export const accountListLoadingSelector = (state) => state[name].listLoading;

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

export default accountSlice.reducer;
