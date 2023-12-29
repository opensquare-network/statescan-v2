import { ApiPromise, WsProvider } from "@polkadot/api";
import { getChainNodes } from "../utils/chain";

const apiInstanceMap = new Map();

async function getMetadata(provider) {
  await provider.isReady;
  const [genesisHash, runtimeVersion] = await Promise.all([
    provider.send("chain_getBlockHash", [0]),
    provider.send("state_getRuntimeVersion", []),
  ]);

  const id = `${genesisHash}-${runtimeVersion.specVersion}`;
  let metadata = localStorage.getItem(id);
  if (!metadata) {
    metadata = provider.send("state_getMetadata", []);
    localStorage.setItem(id, metadata);
  }

  return {
    id,
    metadata,
  };
}

async function createPromise(url) {
  const provider = new WsProvider(url);
  await provider.isReady;
  const { id, metadata } = await getMetadata(provider);
  return await ApiPromise.create({
    provider,
    noInitWarn: true,
    metadata: { [id]: metadata },
  });
}

export async function getChainApi(queryUrl) {
  const nodes = getChainNodes();
  const url = queryUrl || nodes[0]?.url;
  if (!apiInstanceMap.has(url)) {
    const promiseApi = await createPromise(url);
    apiInstanceMap.set(url, promiseApi);
  }
  return apiInstanceMap.get(url);
}

export const estimateBlocksTime = async (api, blocks) => {
  const nsPerBlock = api.consts.babe.expectedBlockTime.toNumber();
  return nsPerBlock * blocks;
};
