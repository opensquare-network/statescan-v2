const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

async function queryIdentityInfo(account, indexer) {
  const blockApi = await findBlockApi(indexer.blockHash);
  return await blockApi.query.identity.identityOf(account);
}

module.exports = {
  queryIdentityInfo,
};
