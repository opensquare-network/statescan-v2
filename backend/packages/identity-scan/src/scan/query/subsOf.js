const { getBlockApiConditionally } = require("../common/api");

async function querySubsOf(parentAccount, indexer) {
  const blockApi = await getBlockApiConditionally(indexer.blockHash);
  if (!blockApi.query.identity.subsOf) {
    return null;
  }

  return await blockApi.query.identity.subsOf(parentAccount);
}

async function queryMultipleSubsOf(accounts = [], indexer) {
  if (accounts.length <= 0) {
    return [];
  }

  const blockApi = await getBlockApiConditionally(indexer.blockHash);
  return await blockApi.query.identity.subsOf.multi(accounts);
}

async function queryMultipleSubsAsMap(accounts = [], indexer) {
  const subsArr = await queryMultipleSubsOf(accounts, indexer);
  return accounts.reduce((result, account, index) => {
    return {
      ...result,
      [account]: subsArr[index],
    };
  }, {});
}

module.exports = {
  querySubsOf,
  queryMultipleSubsOf,
  queryMultipleSubsAsMap,
};
