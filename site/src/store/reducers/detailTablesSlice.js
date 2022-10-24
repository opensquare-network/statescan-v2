import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

const name = "detailTables";

const detailTables = createSlice({
  name,
  initialState: {
    loading: false,
    tables: {},
  },
  reducers: {
    setLoading(state, { payload }) {
      state.loading = payload;
    },
    setTables(state, { payload = {} }) {
      state.tables[payload.key] = payload.value;
    },
  },
});

export const { setLoading, setTables } = detailTables.actions;

export const detailTablesSelector = (state) => state[name].tables;
export const detailTablesLoading = (state) => state[name].loading;

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
