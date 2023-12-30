import { ApiPromise, WsProvider } from "@polkadot/api";
import getMetadata from "./metadata";
import allOptions from "@osn/provider-options";
import Chains from "../utils/consts/chains";

const apiMap = new Map();

async function getOptions(chain, endpoint) {
  const provider = new WsProvider(endpoint, 1000);
  let options = { provider };

  const customizedOptions = allOptions[chain] || {};
  const { id, metadata } = await getMetadata(provider);
  return {
    ...customizedOptions,
    ...options,
    metadata: { [id]: metadata },
  };
}

async function newApiPromise(chain, endpoint) {
  const options = await getOptions(chain, endpoint);
  return new ApiPromise(options);
}

export default async function newApi(chain, endpoint) {
  if (!Object.keys(Chains).includes(chain)) {
    throw new Error(`Invalid chain: ${chain} to construct api`);
  }

  if (!apiMap.has(endpoint)) {
    apiMap.set(endpoint, newApiPromise(chain, endpoint));
  }

  return await apiMap.get(endpoint);
}

export const estimateBlocksTime = async (api, blocks) => {
  const nsPerBlock = api.consts.babe.expectedBlockTime.toNumber();
  return nsPerBlock * blocks;
};

export function getApiMap() {
  return apiMap;
}
