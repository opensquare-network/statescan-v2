import { createSlice } from "@reduxjs/toolkit";

const httpErrorSlice = createSlice({
  name: "httpError",
  initialState: {
    errorCode: null,
  },
  reducers: {
    setErrorCode(state, { payload }) {
      state.errorCode = payload;
    },
  },
});

export const errorCodeSelector = (state) => state.httpError.errorCode;

export const { setErrorCode } = httpErrorSlice.actions;

export default httpErrorSlice.reducer;
