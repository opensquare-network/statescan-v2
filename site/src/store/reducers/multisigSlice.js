import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import { extrinsicApi, extrinsicListApi } from "../../services/urls";

const name = "multisig";

const multisigSlice = createSlice({
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

export const { setDetail, setList, setListLoading } = multisigSlice.actions;

export const multisigListSelector = (state) => state[name].list;
export const multisigListLoadingSelector = (state) => state[name].listLoading;
export const multisigDetailSelector = (state) => state[name].detail;

export const multisigFetchList =
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
export const clearMultisigList = () => (dispatch) => {
  dispatch(setList(null));
};

export const multisigFetchDetail = (id) => async (dispatch) => {
  return api.fetch(extrinsicApi(id)).then(({ result }) => {
    if (result) {
      dispatch(setDetail(result));
    }
  });
};
export const clearMultisigDetail = () => (dispatch) => {
  dispatch(setDetail(null));
};

export default multisigSlice.reducer;
