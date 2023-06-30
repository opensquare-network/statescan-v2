const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

async function querySuperOf(childAccount, indexer) {
  const blockApi = await findBlockApi(indexer.blockHash);
  if (!blockApi.query.identity.superOf) {
    return null;
  }

  return await blockApi.query.identity.superOf(childAccount);
}

module.exports = {
  querySuperOf,
};
