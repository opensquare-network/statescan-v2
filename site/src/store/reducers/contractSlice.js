import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import { contractApi, contractListApi } from "../../services/urls";

const name = "contract";

const contractSlice = createSlice({
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
  contractSlice.actions;

export const contractListSelector = (state) => state[name].list;
export const contractListLoadingSelector = (state) => state[name].listLoading;
export const contractDetailSelector = (state) => state[name].detail;
export const contractDetailLoadingSelector = (state) =>
  state[name].detailLoading;

export const contractFetchList =
  (page, pageSize, options) => async (dispatch) => {
    dispatch(setListLoading(true));

    return api
      .fetch(contractListApi, { page, pageSize }, options)
      .then(({ result }) => {
        if (result) {
          dispatch(setList(result));
        }
      })
      .finally(() => {
        dispatch(setListLoading(false));
      });
  };

export const contractFetchDetail = (address) => async (dispatch) => {
  dispatch(setDetail(null));
  dispatch(setDetailLoading(true));

  return api
    .fetch(contractApi(address))
    .then(({ result }) => {
      if (result) {
        dispatch(setDetail(result));
      }
    })
    .finally(() => {
      dispatch(setDetailLoading(false));
    });
};

export const clearContractList = () => (dispatch) => {
  dispatch(setList(null));
};

export const clearContractDetail = () => (dispatch) => {
  dispatch(setDetail(null));
};

export default contractSlice.reducer;
