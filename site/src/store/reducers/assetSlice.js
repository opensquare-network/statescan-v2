import { createSlice } from "@reduxjs/toolkit";
import { assetListApi } from "../../services/urls";
import api from "../../services/api";

const name = "asset";

const assetSlice = createSlice({
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

export const { setList, setListLoading } = assetSlice.actions;

export const assetListSelector = (state) => state[name].list;
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

export const cleanAssetList = () => (dispatch) => {
  dispatch(setList(null));
};

export default assetSlice.reducer;
