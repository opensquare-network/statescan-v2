import { ApiPromise, WsProvider } from "@polkadot/api";
import {
  DEFAULT_KUSAMA_NODES,
  DEFAULT_KUSAMA_NODE_URL,
  DEFAULT_POLKADOT_NODES,
  DEFAULT_POLKADOT_NODE_URL,
  DEFAULT_LITENTRY_NODES,
  DEFAULT_LITENTRY_NODE_URL,
  DEFAULT_LITMUS_NODE_URL,
  DEFAULT_LITMUS_NODES,
} from "../utils/constants";

let nodeUrl = (() => {
  let localNodeUrl = null;
  try {
    localNodeUrl = JSON.parse(localStorage.getItem("nodeUrl"));
  } catch (e) {
    // ignore parse error
  }
  return {
    kusama:
      DEFAULT_KUSAMA_NODES.find((item) => item.url === localNodeUrl?.kusama)
        ?.url || DEFAULT_KUSAMA_NODE_URL,
    polkadot:
      DEFAULT_POLKADOT_NODES.find((item) => item.url === localNodeUrl?.polkadot)
        ?.url || DEFAULT_POLKADOT_NODE_URL,
    litentry:
      DEFAULT_LITENTRY_NODES.find((item) => item.url === localNodeUrl?.litentry)
        ?.url || DEFAULT_LITENTRY_NODE_URL,
    litmus:
      DEFAULT_LITMUS_NODES.find((item) => item.url === localNodeUrl?.litmus)
        ?.url || DEFAULT_LITMUS_NODE_URL,
  };
})();

export const getNodeUrl = () => nodeUrl;

export const getNodes = () => ({
  kusama: DEFAULT_KUSAMA_NODES,
  polkadot: DEFAULT_POLKADOT_NODES,
  litentry: DEFAULT_LITENTRY_NODES,
  litmus: DEFAULT_LITMUS_NODES,
});

const apiInstanceMap = new Map();

export function getChainApi(chain, queryUrl) {
  const url = queryUrl || nodeUrl?.[chain];
  if (!apiInstanceMap.has(url)) {
    apiInstanceMap.set(
      url,
      ApiPromise.create({ provider: new WsProvider(url) }),
    );
  }
  return apiInstanceMap.get(url);
}

export const estimateBlocksTime = async (chain, blocks) => {
  const api = await getChainApi(chain);
  const nsPerBlock = api.consts.babe.expectedBlockTime.toNumber();
  return nsPerBlock * blocks;
};
