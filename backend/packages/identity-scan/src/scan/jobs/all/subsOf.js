const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

async function getSubsOfMap(indexer) {
  const blockApi = await findBlockApi(indexer.blockHash);
  const entries = await blockApi.query.identity.subsOf.entries();
  return (entries || []).reduce((result, [key, subsOf]) => {
    const address = key.args[0].toString();

    return {
      ...result,
      [address]: subsOf,
    };
  }, {});
}

module.exports = {
  getSubsOfMap,
};
