import { ApiPromise, WsProvider } from "@polkadot/api";
import { getChainNodes } from "../utils/chain";

const apiInstanceMap = new Map();

export function getChainApi(queryUrl) {
  const nodes = getChainNodes();
  const url = queryUrl || nodes[0]?.url;
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
