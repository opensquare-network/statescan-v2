const { isScanPeopleChain } = require("./chain");
const { getPeopleChainApi } = require("../people/api/api");
const {
  chain: { getApi },
} = require("@osn/scan-common");

let blockApiMap = {};

async function getApiConditionally() {
  if (isScanPeopleChain()) {
    return await getPeopleChainApi();
  } else {
    return await getApi();
  }
}

function setBlockApi(blockHash, api) {
  blockApiMap[blockHash] = api;
}

async function getBlockApiConditionally(blockHash) {
  const maybe = blockApiMap[blockHash];
  if (maybe) {
    return maybe;
  }

  const api = await getApiConditionally();
  const blockApi = await api.at(blockHash);

  setBlockApi(blockHash, blockApi);
  return blockApi;
}

module.exports = {
  getApiConditionally,
  getBlockApiConditionally,
};
