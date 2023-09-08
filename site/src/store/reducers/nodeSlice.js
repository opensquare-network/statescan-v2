import { createSlice } from "@reduxjs/toolkit";
import { getChainNodes } from "../../utils/chain";

const chain = process.env.REACT_APP_PUBLIC_CHAIN;

function getInitNodeUrl(chain) {
  const localNodeUrl = localStorage.getItem("nodeUrl");
  const chainNodes = getChainNodes();
  const node = (chainNodes || []).find(({ url }) => url === localNodeUrl);
  if (node) {
    return node.url;
  } else if (chainNodes) {
    return chainNodes[0].url;
  }

  throw new Error(`Can not find nodes for ${chain}`);
}

const nodeSlice = createSlice({
  name: "node",
  initialState: {
    currentNode: getInitNodeUrl(chain),
    nodes: getChainNodes(),
  },
  reducers: {
    setCurrentNode(state, { payload }) {
      const { url, refresh } = payload;
      const beforeUrl = state.currentNode;

      state.currentNode = url;
      state.nodes = (state.nodes || []).map((item) => {
        if (item.url === beforeUrl) {
          return { ...item, update: true };
        } else {
          return item;
        }
      });
      localStorage.setItem("nodeUrl", url);

      if (refresh) {
        window.location.href = `https://${chain}.statescan.io`;
      }
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

export const { setCurrentNode, setNodesDelay } = nodeSlice.actions;

export default nodeSlice.reducer;
