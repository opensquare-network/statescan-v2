import { createSlice } from "@reduxjs/toolkit";
import { nftApi, nftListApi } from "../../services/urls";
import api from "../../services/api";
import {
  clearHttpError,
  handleApiError,
} from "../../utils/viewFuncs/errorHandles";

const name = "nft";

const nftSlice = createSlice({
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

export const { setList, setListLoading, setDetail } = nftSlice.actions;

export const nftListSelector = (state) => state[name].list;
export const nftDetailSelector = (state) => state[name].detail;
export const nftListLoadingSelector = (state) => state[name].listLoading;

export const nftFetchList =
  (page, pageSize, params, fetchOptions) => async (dispatch) => {
    dispatch(setListLoading(true));

    return api
      .fetch(nftListApi, { page, pageSize, ...params }, fetchOptions)
      .then(({ result }) => {
        if (result) {
          dispatch(setList(result));
        }
      })
      .finally(() => {
        dispatch(setListLoading(false));
      });
  };

export const nftFetchDetail = (id) => async (dispatch) => {
  clearHttpError(dispatch);

  return api
    .fetch(nftApi(id))
    .then(({ result }) => {
      if (result) {
        dispatch(setDetail(result));
      }
    })
    .catch((error) => {
      handleApiError(error, dispatch);
    });
};

export const cleanNftList = () => (dispatch) => {
  dispatch(setList(null));
};

export default nftSlice.reducer;
