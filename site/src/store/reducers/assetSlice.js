import { createSlice } from "@reduxjs/toolkit";
import { assetApi, assetListApi } from "../../services/urls";
import api from "../../services/api";
import {
  clearHttpError,
  handleApiError,
} from "../../utils/viewFuncs/errorHandles";

const name = "asset";

const assetSlice = createSlice({
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

export const { setList, setListLoading, setDetail } = assetSlice.actions;

export const assetListSelector = (state) => state[name].list;
export const assetDetailSelector = (state) => state[name].detail;
export const assetListLoadingSelector = (state) => state[name].listLoading;

export const assetFetchList =
  (page, pageSize, params, fetchOptions) => async (dispatch) => {
    dispatch(setListLoading(true));

    return api
      .fetch(assetListApi, { page, pageSize, ...params }, fetchOptions)
      .then(({ result }) => {
        if (result) {
          dispatch(setList(result));
        }
      })
      .finally(() => {
        dispatch(setListLoading(false));
      });
  };

export const assetFetchDetail = (id) => async (dispatch) => {
  clearHttpError(dispatch);

  return api
    .fetch(assetApi(id))
    .then(({ result }) => {
      if (result) {
        dispatch(setDetail(result));
      }
    })
    .catch((error) => {
      handleApiError(error, dispatch);
    });
};

export const clearAssetList = () => (dispatch) => {
  dispatch(setList(null));
};

export const clearAssetDetail = () => (dispatch) => {
  dispatch(setDetail(null));
};

export default assetSlice.reducer;
