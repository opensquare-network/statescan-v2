const {
  chain: { findBlockApi, getApi },
} = require("@osn/scan-common");

async function queryIdentityInfo(account, indexer) {
  const blockApi = await findBlockApi(indexer.blockHash);
  return await blockApi.query.identity.identityOf(account);
}

async function queryIdentityInfoByHeight(account, blockHeight) {
  const api = await getApi();
  const blockHash = await api.rpc.chain.getBlockHash(blockHeight);
  return await queryIdentityInfo(account, { blockHeight, blockHash });
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
  queryIdentityInfoByHeight,
  queryMultipleIdentity,
};
