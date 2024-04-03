const {
  getAssetAddresses,
  clearAssetAddresses,
} = require("../../store/assetsAccounts");
const isEmpty = require("lodash.isempty");
const {
  queryAssetsAccounts,
} = require("../../scan/query/assets/account/assetsAccount");
const {
  getActiveAssetOrThrow,
} = require("../../scan/mongo/assets/getActiveAsset");
const {
  asset: { getAssetHolderCol },
} = require("@statescan/mongo");
const {
  utils: { gt, toDecimal128 },
} = require("@statescan/common");

async function deleteAssetHolders(assetId, blockHeight) {
  const asset = await getActiveAssetOrThrow(assetId, blockHeight);
  const col = await getAssetHolderCol();
  await col.deleteMany({
    assetId,
    assetHeight: asset.assetHeight,
  });
}

async function updateAssetAccounts(assetId, addresses, indexer) {
  const asset = await getActiveAssetOrThrow(assetId, indexer.blockHeight);
  const assetHeight = asset.assetHeight;
  const col = await getAssetHolderCol();
  const bulk = col.initializeUnorderedBulkOp();
  const assetAccounts = await queryAssetsAccounts(
    assetId,
    addresses,
    indexer.blockHash,
  );
  for (const assetAccount of assetAccounts) {
    const { address } = assetAccount;
    const balance = assetAccount?.info?.balance || 0;
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
  deleteAssetHolders,
};
