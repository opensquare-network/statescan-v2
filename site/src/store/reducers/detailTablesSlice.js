import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";
import { makeSelector, makeSetReducer } from "../../utils/redux";

const name = "detailTables";

const detailTables = createSlice({
  name,
  initialState: {
    loading: false,
    tables: {},
  },
  reducers: {
    setLoading: makeSetReducer("loading"),
    setTables(state, { payload = {} }) {
      state.tables[payload.key] = payload.value;
    },
  },
});

export const { setLoading, setTables } = detailTables.actions;

export const detailTablesSelector = makeSelector(name, "tables");
export const detailTablesLoading = makeSelector(name, "loading");

/**
 * @param {string} key is the tables[key]
 */
export const fetchDetailTable =
  (key, url, page, pageSize) => async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const { result } = await api.fetch(url, { page, pageSize });

      if (result) {
        dispatch(setTables({ key, value: result }));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

export const cleanupDetailTables = () => (dispatch) => {
  dispatch(setTables({}));
};

export default detailTables.reducer;
