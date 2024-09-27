const { getApiConditionally } = require("../common");
const { getBlockApiConditionally } = require("../common/api");

async function queryIdentityInfo(account, indexer) {
  const blockApi = await getBlockApiConditionally(indexer.blockHash);
  return await blockApi.query.identity.identityOf(account);
}

async function queryIdentityInfoByHeight(account, blockHeight) {
  const api = await getApiConditionally();
  const blockHash = await api.rpc.chain.getBlockHash(blockHeight);
  return await queryIdentityInfo(account, { blockHeight, blockHash });
}

async function queryMultipleIdentity(accounts = [], indexer) {
  if (accounts.length <= 0) {
    return [];
  }

  const blockApi = await getBlockApiConditionally(indexer.blockHash);
  return await blockApi.query.identity.identityOf.multi(accounts);
}

async function queryMultipleIdentityAsMap(accounts, indexer) {
  const identities = await queryMultipleIdentity(accounts, indexer);
  return accounts.reduce((result, account, index) => {
    const identity = identities[index];
    return {
      ...result,
      [account]: identity,
    };
  }, {});
}

module.exports = {
  queryIdentityInfo,
  queryIdentityInfoByHeight,
  queryMultipleIdentity,
  queryMultipleIdentityAsMap,
};
