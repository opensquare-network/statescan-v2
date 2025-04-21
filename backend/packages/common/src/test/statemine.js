const {
  env: { setChain },
  chain: { setApi, setProvider },
} = require("@osn/scan-common");
const { ApiPromise, WsProvider } = require("@polkadot/api");

// const statemineEndpoint = "wss://kusama-asset-hub-rpc.polkadot.io/";
const statemineEndpoint = "wss://sys.ibp.network/asset-hub-kusama";

async function setStatemine(endpoint) {
  jest.setTimeout(3000000);
  setChain("statemine");
  const provider = new WsProvider(endpoint || statemineEndpoint, 1000);
  const api = await ApiPromise.create({ provider });
  setProvider(provider);
  setApi(api);
}

module.exports = {
  setStatemine,
};
