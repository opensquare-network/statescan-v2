const {
  getAssetAddresses,
  clearAssetAddresses,
} = require("../../store/assetsAccounts");
const isEmpty = require("lodash.isempty");
const {
  queryAssetsAccounts,
} = require("../../scan/query/assets/account/assetsAccount");
const { getActiveAsset } = require("../../scan/mongo/assets/getActiveAsset");
const {
  asset: { getAssetHolderCol },
} = require("@statescan/mongo");
const {
  utils: { gt, toDecimal128 },
} = require("@statescan/common");

async function updateAssetAccounts(assetId, addresses, indexer) {
  const asset = await getActiveAsset(assetId);
  if (!asset) {
    throw new Error(
      `can not find the asset ${assetId} when update holders at ${indexer.blockHeight}`,
    );
  }

  const assetHeight = asset.assetHeight;
  const col = await getAssetHolderCol();
  const bulk = col.initializeUnorderedBulkOp();
  const assetAccounts = await queryAssetsAccounts(
    assetId,
    addresses,
    indexer.blockHash,
  );
  for (const assetAccount of assetAccounts) {
    const {
      address,
      info: { balance },
    } = assetAccount;
    if (!gt(balance, 0)) {
      bulk.find({ assetId, assetHeight, address }).delete();
      continue;
    }

    bulk
      .find({ assetId, assetHeight, address })
      .upsert()
      .update({
        $set: {
          ...assetAccount.info,
          balance: toDecimal128(balance),
        },
      });
  }

  await bulk.execute();
}

async function updateAssetsAccounts(indexer) {
  const assetAddressesMap = getAssetAddresses(indexer.blockHash);
  if (isEmpty(assetAddressesMap)) {
    return;
  }

  for (const [assetId, addresses] of Object.entries(assetAddressesMap)) {
    await updateAssetAccounts(parseInt(assetId), addresses, indexer);
  }

  clearAssetAddresses(indexer.blockHash);
}

module.exports = {
  updateAssetsAccounts,
};
