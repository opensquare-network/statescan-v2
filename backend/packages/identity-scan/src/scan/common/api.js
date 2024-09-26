const { isScanPeopleChain } = require("./chain");
const { getPeopleChainApi } = require("../people/api/api");
const {
  chain: { getApi },
} = require("@osn/scan-common");

async function getApiConditionally() {
  if (isScanPeopleChain()) {
    return await getPeopleChainApi();
  } else {
    return await getApi();
  }
}

module.exports = {
  getApiConditionally,
};
