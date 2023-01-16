import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import { transferListApi } from "../../services/urls";

const name = "transfer";

const transferSlice = createSlice({
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

export const { setList, setListLoading } = transferSlice.actions;

export const transferListSelector = (state) => state[name].list;
export const transferListLoadingSelector = (state) => state[name].listLoading;

export const transferFetchList =
  (page, pageSize, params, fetchOptions) => async (dispatch) => {
    dispatch(setListLoading(true));

    return api
      .fetch(transferListApi, { page, pageSize, ...params }, fetchOptions)
      .then(({ result }) => {
        if (result) {
          dispatch(setList(result));
        }
      })
      .finally(() => {
        dispatch(setListLoading(false));
      });
  };
export const clearTransferList = () => (dispatch) => {
  dispatch(setList(null));
};

export default transferSlice.reducer;
