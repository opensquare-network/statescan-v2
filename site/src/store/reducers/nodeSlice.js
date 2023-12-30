import { createSelector, createSlice } from "@reduxjs/toolkit";
import { getChainNodes } from "../../utils/chain";
import getEndpointFromLocalStorage from "../../utils/hooks/chain/apis/endpointLocalStorage";

const chain = process.env.REACT_APP_PUBLIC_CHAIN;

const nodeSlice = createSlice({
  name: "node",
  initialState: {
    currentNode: getEndpointFromLocalStorage(),
    nodes: getChainNodes(),
  },
  reducers: {
    setCurrentNode(state, { payload }) {
      const { url, refresh, saveLocalStorage = true } = payload;
      const beforeUrl = state.currentNode;

      state.currentNode = url;
      state.nodes = (state.nodes || []).map((item) => {
        if (item.url === beforeUrl) {
          return { ...item, update: true };
        } else {
          return item;
        }
      });

      if (saveLocalStorage) {
        localStorage.setItem("nodeUrl", url);
      }

      if (refresh) {
        window.location.href = `https://${chain}.statescan.io`;
      }
    },
    removeCurrentNode(state) {
      localStorage.removeItem("nodeUrl");
      state.currentNode = null;
    },
    setNodesDelay(state, { payload }) {
      const node = (state.nodes || []).find(
        (node) => payload?.url === node.url,
      );
      if (node) node.delay = payload?.delay;
    },
  },
});

export const currentNodeSelector = (state) => state.node?.currentNode;
export const nodesSelector = (state) => state.node?.nodes;
export const needUpdateNodesSelector = createSelector(nodesSelector, (nodes) =>
  nodes.filter((node) => node.update).map((node) => node.url),
);

export const { setCurrentNode, removeCurrentNode, setNodesDelay } =
  nodeSlice.actions;

export default nodeSlice.reducer;
