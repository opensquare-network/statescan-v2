const { getBlockApiConditionally } = require("../common/api");

async function querySuperOf(childAccount, indexer) {
  const blockApi = await getBlockApiConditionally(indexer.blockHash);
  if (!blockApi.query.identity.superOf) {
    return null;
  }

  return await blockApi.query.identity.superOf(childAccount);
}

module.exports = {
  querySuperOf,
};
