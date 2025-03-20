// assetLocation is also assetId
const { getForeignAssetsSection } = require("../../consts/section");

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

module.exports = {
  queryForeignAssetAccount,
};
