import { ApiPromise, WsProvider } from "@polkadot/api";
import {
  DEFAULT_KUSAMA_NODES,
  DEFAULT_KUSAMA_NODE_URL,
  DEFAULT_POLKADOT_NODES,
  DEFAULT_POLKADOT_NODE_URL,
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
  };
})();

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
