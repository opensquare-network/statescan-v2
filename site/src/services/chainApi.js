import { ApiPromise, WsProvider } from "@polkadot/api";
import {
  DEFAULT_KUSAMA_NODES,
  DEFAULT_POLKADOT_NODES,
  DEFAULT_LITENTRY_NODES,
  DEFAULT_LITMUS_NODES,
} from "../utils/constants";

export const allChainNodes = {
  kusama: DEFAULT_KUSAMA_NODES,
  polkadot: DEFAULT_POLKADOT_NODES,
  litentry: DEFAULT_LITENTRY_NODES,
  litmus: DEFAULT_LITMUS_NODES,
};

const apiInstanceMap = new Map();

export function getChainApi(chain, queryUrl) {
  const url = queryUrl || allChainNodes[chain]?.[0]?.url;
  if (!apiInstanceMap.has(url)) {
    apiInstanceMap.set(
      url,
      ApiPromise.create({ provider: new WsProvider(url) }),
    );
  }
  return apiInstanceMap.get(url);
}

export const estimateBlocksTime = async (api, blocks) => {
  const nsPerBlock = api.consts.babe.expectedBlockTime.toNumber();
  return nsPerBlock * blocks;
};
