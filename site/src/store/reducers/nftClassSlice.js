import { createSlice } from "@reduxjs/toolkit";
import { nftClassApi } from "../../services/urls";
import api from "../../services/api";
import {
  clearHttpError,
  handleApiError,
} from "../../utils/viewFuncs/errorHandles";

const name = "nftClass";

const nftClassSlice = createSlice({
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

export const { setDetail } = nftClassSlice.actions;

export const nftClassDetailSelector = (state) => state[name].detail;

export const fetchNftClassDetail = (id) => async (dispatch) => {
  clearHttpError(dispatch);

  return api
    .fetch(nftClassApi(id))
    .then(({ result }) => {
      if (result) {
        dispatch(setDetail(result));
      }
    })
    .catch((error) => {
      handleApiError(error, dispatch);
    });
};

export const resetNftClassDetail = () => (dispatch) => {
  dispatch(setDetail(null));
};

export default nftClassSlice.reducer;
