import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import { eventApi } from "../../services/urls";

const name = "event";

const eventSlice = createSlice({
  name,
  initialState: {
    detail: null,
  },
  reducers: {
    setDetail(state, { payload }) {
      state.detail = payload;
    },
  },
});

export const { setDetail } = eventSlice.actions;

export const eventDetailSelector = (state) => state[name].detail;

export const eventFetchDetail = (id) => async (dispatch) => {
  return api.fetch(eventApi(id)).then(({ result }) => {
    if (result) {
      dispatch(setDetail(result));
    }
  });
};
export const resetEventDetail = () => (dispatch) => {
  dispatch(setDetail(null));
};

export default eventSlice.reducer;
