import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

const name = "registrars";

export const registrarsSlice = createSlice({
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

export const {
  setList,
  setListLoading,
  setDetail,
  setDetailLoading,
  setSummary,
} = registrarsSlice.actions;

export const registrarsListSelector = (state) => state[name].list;
export const registrarsListLoadingSelector = (state) => state[name].listLoading;

export const registrarsFetchList = () => async (dispatch) => {
  dispatch(setListLoading(true));

  return api
    .post(process.env.REACT_APP_PUBLIC_IDENTITY_API_END_POINT + "/graphql", {
      query: `
        {
          registrars {
            account
          }
        }
      `,
    })
    .finally(() => {
      dispatch(setListLoading(false));
    });
};

export default registrarsSlice.reducer;
