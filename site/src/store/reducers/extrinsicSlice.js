import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import {
  extrinsicApi,
  extrinsicCallsApi,
  extrinsicEventsApi,
} from "../../services/urls";
import { makeSelector, makeSetReducer } from "../../utils/redux";

const name = "extrinsic";

const extrinsicSlice = createSlice({
  name,
  initialState: {
    detail: null,
    eventsTable: {},
    callsTable: {},
  },
  reducers: {
    setDetail: makeSetReducer("detail"),
    setEventsTable: makeSetReducer("eventsTable"),
    setCallsTable: makeSetReducer("callsTable"),
  },
});

export const { setDetail, setEventsTable, setCallsTable } =
  extrinsicSlice.actions;

export const extrinsicDetailSelector = makeSelector(name, "detail");
export const extrinsicEventsTable = makeSelector(name, "eventsTable");
export const extrinsicCallsTable = makeSelector(name, "callsTable");

export const extrinsicFetchDetail = (id) => async (dispatch) => {
  return api.fetch(extrinsicApi(id)).then(({ result }) => {
    if (result) {
      dispatch(setDetail(result));
    }
  });
};
export const resetExtrinsicDetail = () => (dispatch) => {
  dispatch(setDetail(null));
};

export const extrinsicFetchEventsTable =
  (id, page, pageSize) => async (dispatch) => {
    return api
      .fetch(extrinsicEventsApi(id), { page, pageSize })
      .then(({ result }) => {
        if (result) {
          dispatch(setEventsTable(result));
        }
      });
  };

export const extrinsicFetchCallsTable =
  (id, page, pageSize) => async (dispatch) => {
    return api
      .fetch(extrinsicCallsApi(id), { page, pageSize })
      .then(({ result }) => {
        if (result) {
          dispatch(setCallsTable(result));
        }
      });
  };

export default extrinsicSlice.reducer;
