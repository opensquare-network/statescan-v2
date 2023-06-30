const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

async function queryIdentityInfo(account, indexer) {
  const blockApi = await findBlockApi(indexer.blockHash);
  return await blockApi.query.identity.identityOf(account);
}

async function queryMultipleIdentity(accounts = [], indexer) {
  if (accounts.length <= 0) {
    return [];
  }

  const blockApi = await findBlockApi(indexer.blockHash);
  return await blockApi.query.identity.identityOf.multi(accounts);
}

module.exports = {
  queryIdentityInfo,
  queryMultipleIdentity,
};
