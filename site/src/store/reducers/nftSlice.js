import { createSlice } from "@reduxjs/toolkit";
import { nftListApi } from "../../services/urls";
import api from "../../services/api";

const name = "nft";

const nftSlice = createSlice({
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

export const { setList, setListLoading } = nftSlice.actions;

export const nftListSelector = (state) => state[name].list;
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

export const cleanNftList = () => (dispatch) => {
  dispatch(setList(null));
};

export default nftSlice.reducer;
