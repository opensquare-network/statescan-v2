const {
  chain: { findBlockApi },
} = require("@osn/scan-common");
const { getAssetsSection } = require("../../../consts/section");

async function queryAssetAccount(blockApi, assetId, address) {
  const section = getAssetsSection();
  const rawAccountInfo = await blockApi.query[section].account(
    assetId,
    address,
  );
  if (rawAccountInfo.isSome) {
    const unwrapped = rawAccountInfo.unwrap();
    const json = unwrapped.toJSON();
    return {
      address,
      info: {
        ...json,
        balance: unwrapped.balance.toBigInt().toString(),
      },
    };
  } else {
    return { address, info: null };
  }
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
