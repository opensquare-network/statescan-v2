import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import { eventApi, eventListApi } from "../../services/urls";

const name = "event";

const eventSlice = createSlice({
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

export const { setDetail, setList, setListLoading } = eventSlice.actions;

export const eventListSelector = (state) => state[name].list;
export const eventListLoadingSelector = (state) => state[name].listLoading;
export const eventDetailSelector = (state) => state[name].detail;

export const eventFetchList =
  (page, pageSize, params, fetchOptions) => async (dispatch) => {
    dispatch(setListLoading(true));

    return api
      .fetch(eventListApi, { page, pageSize, ...params }, fetchOptions)
      .then(({ result }) => {
        if (result) {
          dispatch(setList(result));
        }
      })
      .finally(() => {
        dispatch(setListLoading(false));
      });
  };
export const clearEventList = () => (dispatch) => {
  dispatch(setList(null));
};

export const eventFetchDetail = (id) => async (dispatch) => {
  return api.fetch(eventApi(id)).then(({ result }) => {
    if (result) {
      dispatch(setDetail(result));
    }
  });
};
export const clearEventDetail = () => (dispatch) => {
  dispatch(setDetail(null));
};

export default eventSlice.reducer;
