import { createSlice } from "@reduxjs/toolkit";
import { nftInstanceApi } from "../../services/urls";
import api from "../../services/api";
import {
  clearHttpError,
  handleApiError,
} from "../../utils/viewFuncs/errorHandles";

const name = "nftInstance";

const nftInstanceSlice = createSlice({
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

export const { setDetail } = nftInstanceSlice.actions;

export const nftInstanceDetailSelector = (state) => state[name].detail;

export const fetchNftInstanceDetail =
  (classId, instanceId) => async (dispatch) => {
    clearHttpError(dispatch);

    return api
      .fetch(nftInstanceApi(classId, instanceId))
      .then(({ result }) => {
        if (result) {
          dispatch(setDetail(result));
        }
      })
      .catch((error) => {
        handleApiError(error, dispatch);
      });
  };

export const clearNftInstanceDetail = () => (dispatch) => {
  dispatch(setDetail(null));
};

export default nftInstanceSlice.reducer;
