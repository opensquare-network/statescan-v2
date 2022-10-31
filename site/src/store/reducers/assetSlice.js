import { createSlice } from "@reduxjs/toolkit";

const name = "asset";

const assetSlice = createSlice({
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

export const { setList, setListLoading } = assetSlice.actions;

export const assetListSelector = (state) => state[name].list;
export const assetListLoadingSelector = (state) => state[name].listLoading;

export const assetFetchList =
  (page, pageSize, params, fetchOptions) => async (dispatch) => {
    dispatch(
      setList({
        items: [
          {
            _id: "6328960e36b81ad75f4f81cb",
            assetId: 25,
            destroyedAt: null,
            accounts: 1,
            admin: "D8G79tUueLbCtkBJzqJpovARQW6pi7uQJ1UtnMbzFd8h3P2",
            approvals: 0,
            createdAt: {
              blockHeight: 439957,
              blockHash:
                "0x663ae7904760904ad138a2cdea2847741cb725d8baf8d22105772acb26473a24",
              blockTime: 1627746006374,
              eventIndex: 3,
              extrinsicIndex: 2,
            },
            decimals: 10,
            deposit: 6693999660,
            freezer: "D8G79tUueLbCtkBJzqJpovARQW6pi7uQJ1UtnMbzFd8h3P2",
            isFrozen: false,
            isSufficient: false,
            issuer: "D8G79tUueLbCtkBJzqJpovARQW6pi7uQJ1UtnMbzFd8h3P2",
            minBalance: 10000000000,
            name: "Polkababes",
            owner: "D8G79tUueLbCtkBJzqJpovARQW6pi7uQJ1UtnMbzFd8h3P2",
            sufficients: 0,
            supply: "0x00000000204fce5e3e25026110000000",
            symbol: "BABE",
          },
        ],
        page: 1,
        pageSize: 25,
        total: 142,
      }),
    );
  };

export const cleanTransferList = () => (dispatch) => {
  dispatch(setList(null));
};

export default assetSlice.reducer;
