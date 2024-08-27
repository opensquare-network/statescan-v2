const { statusLogger } = require("../logger");
const { getEndpoints } = require("../env");
const { createApiForChain } = require("@osn/polkadot-api-container");

async function createChainApis() {
  const chainEndpoints = getEndpoints();

  const promises = [];
  for (const { chain, endpoints } of chainEndpoints) {
    if ((endpoints || []).length > 0) {
      promises.push(createApiForChain(chain, endpoints, statusLogger));
    }
  }

  return Promise.all(promises);
}

module.exports = {
  createChainApis,
};
