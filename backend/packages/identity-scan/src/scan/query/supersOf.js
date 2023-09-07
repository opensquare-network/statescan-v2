const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

async function queryMultipleSuperOf(accounts = [], indexer) {
  if (accounts.length <= 0) {
    return [];
  }

  const blockApi = await findBlockApi(indexer.blockHash);
  return await blockApi.query.identity.superOf.multi(accounts);
}

async function queryMultipleSuperOfAsMap(accounts = [], indexer) {
  const superArr = await queryMultipleSuperOf(accounts, indexer);
  return accounts.reduce((result, account, index) => {
    return {
      ...result,
      [account]: superArr[index],
    };
  }, {});
}

module.exports = {
  queryMultipleSuperOf,
  queryMultipleSuperOfAsMap,
};
