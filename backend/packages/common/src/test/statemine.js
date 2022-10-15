const {
  env: { setChain },
  chain: { setApi, setProvider },
} = require("@osn/scan-common");
const { ApiPromise, WsProvider } = require("@polkadot/api");

const statemineEndpoint = "wss://statemine.api.onfinality.io/public-ws";

async function setStatemine() {
  jest.setTimeout(3000000);
  const provider = new WsProvider(statemineEndpoint, 1000);
  const api = await ApiPromise.create({ provider });
  setProvider(provider);
  setApi(api);
  setChain("statemine");
}

module.exports = {
  setStatemine,
};
