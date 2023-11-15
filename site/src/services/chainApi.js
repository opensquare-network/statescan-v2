import { ApiPromise, WsProvider } from "@polkadot/api";
import { getChainNodes } from "../utils/chain";

const apiInstanceMap = new Map();

function createPromise(url) {
  let instance = null
  return async function () {
    if (instance) {
      return instance
    }
    const http = url.replace('wss://', 'https://').replace('ws://', 'http://')
    const [blockHashResp, specResp] = await Promise.all([
      fetch(http, { method: 'POST', body: '{"id":1,"jsonrpc":"2.0","method":"chain_getBlockHash","params":[0]}', headers: { 'content-type': 'application/json' } }).then(resp => resp.json()),
      fetch(http, { method: 'POST', body: '{"id":2,"jsonrpc":"2.0","method":"state_getRuntimeVersion","params":[]}', headers: { 'content-type': 'application/json' } }).then(resp => resp.json()),
    ])
    const id = `${blockHashResp.result}-${specResp.result.specVersion}`
    let metadata = localStorage.getItem(id)
    if (!metadata) {
      const metadataResp = await fetch(
        http,
        {
          method: 'POST',
          body: '{"id":3,"jsonrpc":"2.0","method":"state_getMetadata","params":[]}',
          headers: { 'content-type': 'application/json' }
        }
      ).then(resp => resp.json())
      metadata = metadataResp.result
      localStorage.setItem(id, metadata)
    }
    instance = await ApiPromise.create({
      provider: new WsProvider(url),
      noInitWarn: true,
      metadata: { [id]: metadata },
    })
    return instance
  }()
}

export function getChainApi(queryUrl) {
  const nodes = getChainNodes();
  const url = queryUrl || nodes[0]?.url;
  if (!apiInstanceMap.has(url)) {
    apiInstanceMap.set(
      url,
      createPromise(url)
    );
  }
  return apiInstanceMap.get(url);
}

export const estimateBlocksTime = async (api, blocks) => {
  const nsPerBlock = api.consts.babe.expectedBlockTime.toNumber();
  return nsPerBlock * blocks;
};
