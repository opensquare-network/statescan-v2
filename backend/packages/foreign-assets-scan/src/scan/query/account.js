// assetLocation is also assetId
const { getForeignAssetsSection } = require("../../consts/section");
const {
  chain: { findBlockApi },
} = require("@osn/scan-common");
const { queryForeignAssetLocation } = require("../common/getLocation");

async function queryForeignAssetAccount(blockApi, assetLocation, address) {
  const section = getForeignAssetsSection();
  const rawAccountInfo = await blockApi.query[section].account(
    assetLocation,
    address,
  );
  if (!rawAccountInfo.isSome) {
    return { address, info: null };
  }

  const unwrapped = rawAccountInfo.unwrap();
  const json = unwrapped.toJSON();
  return {
    address,
    info: {
      ...json,
      balance: unwrapped.balance.toBigInt().toString(),
    },
  };
}

async function queryForeignAssetsAccounts(assetId, addresses = [], blockHash) {
  if (addresses.length <= 0) {
    return [];
  }

  const location = await queryForeignAssetLocation(blockHash, assetId);
  const blockApi = await findBlockApi(blockHash);
  const promises = [];
  for (const address of addresses) {
    promises.push(queryForeignAssetAccount(blockApi, location, address));
  }

  return Promise.all(promises);
}

module.exports = {
  queryForeignAssetAccount,
  queryForeignAssetsAccounts,
};
