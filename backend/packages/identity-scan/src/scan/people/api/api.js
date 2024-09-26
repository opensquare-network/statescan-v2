const { ApiPromise, WsProvider } = require("@polkadot/api");

let provider = null;
let api = null;

function getEndPoints() {
  const wsEndpoint = process.env.PEOPLE_CHAIN_ENDPOINTS;
  if (!wsEndpoint) {
    throw new Error("PEOPLE_CHAIN_ENDPOINTS not set");
  }

  if ((wsEndpoint || "").includes(";")) {
    return wsEndpoint.split(";");
  } else {
    return wsEndpoint;
  }
}

async function getPeopleChainApi() {
  if (!api) {
    const endpoints = getEndPoints();
    provider = new WsProvider(endpoints, 1000);
    api = await ApiPromise.create({ provider });
    console.log(
      `Connected to people chain endpoint:`,
      process.env.PEOPLE_CHAIN_ENDPOINTS,
    );
  }

  return api;
}

module.exports = {
  getPeopleChainApi,
};
