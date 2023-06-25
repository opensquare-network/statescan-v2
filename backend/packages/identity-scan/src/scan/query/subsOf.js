const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

async function querySubsOf(parentAccount, indexer) {
  const blockApi = await findBlockApi(indexer.blockHash);
  if (!blockApi.query.identity.subsOf) {
    return null;
  }

  return await blockApi.query.identity.subsOf(parentAccount);
}

async function queryMultipleSubsOf(accounts = [], indexer) {
  if (accounts.length <= 0) {
    return [];
  }

  const blockApi = await findBlockApi(indexer.blockHash);
  return await blockApi.query.identity.subsOf.multi(accounts);
}

module.exports = {
  querySubsOf,
  queryMultipleSubsOf,
};
