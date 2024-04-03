const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

async function queryAssetAccount(blockApi, assetId, address) {
  const rawAccountInfo = await blockApi.query.assets.account(assetId, address);
  return {
    address,
    info: rawAccountInfo.toJSON(),
  };
}

async function queryAssetsAccounts(assetId, addresses = [], blockHash) {
  if (addresses.length <= 0) {
    return [];
  }

  const blockApi = await findBlockApi(blockHash);
  const promises = [];
  for (const address of addresses) {
    promises.push(queryAssetAccount(blockApi, assetId, address));
  }

  return Promise.all(promises);
}

module.exports = {
  queryAssetsAccounts,
};
