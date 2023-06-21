const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

async function querySuperOf(childAccount, indexer) {
  const blockApi = await findBlockApi(indexer.blockHash);
  return await blockApi.query.identity.superOf(childAccount);
}

module.exports = {
  querySuperOf,
};
