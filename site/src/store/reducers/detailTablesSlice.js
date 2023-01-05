import { createSlice } from "@reduxjs/toolkit";

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
    setTable(state, { payload = {} }) {
      state.tables[payload.key] = payload.value;
    },
    clearTables(state) {
      state.tables = {};
    },
  },
});

export const {
  setLoading: setDetailTablesLoading,
  setTable: setDetailTable,
  clearTables: clearDetailTables,
} = detailTables.actions;

export const detailTablesSelector = (state) => state[name].tables;
export const detailTablesLoading = (state) => state[name].loading;

export default detailTables.reducer;
