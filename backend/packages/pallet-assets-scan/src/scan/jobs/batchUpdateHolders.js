const isEmpty = require("lodash.isempty");
const {
  getAssetAddresses,
  clearAssetAddresses,
} = require("../../store/assetsAccounts");
const {
  palletAsset: { getActiveAsset, getHolderCol },
} = require("@statescan/mongo");
const { queryAssetsAccounts } = require("../query/account");
const { bigGt } = require("@statescan/common/src/utils/bigInt");

async function updateAssetHolders(assetId, addresses, indexer) {
  const asset = await getActiveAsset(assetId);
  if (!asset) {
    return;
  }

  const assetHeight = asset.assetHeight;
  const col = await getHolderCol();
  const bulk = col.initializeUnorderedBulkOp();

  const assetAccounts = await queryAssetsAccounts(
    assetId,
    addresses,
    indexer.blockHash,
  );
  for (const assetAccount of assetAccounts) {
    const { address, info } = assetAccount;
    const balance = info?.balance || 0;

    if (!bigGt(balance, 0)) {
      bulk.find({ assetId, assetHeight, address }).delete();
    } else {
      bulk
        .find({ assetId, assetHeight, address })
        .upsert()
        .update({ $set: info });
    }
  }

  if (bulk.length > 0) {
    await bulk.execute();
  }
}

async function batchUpdateAssetHolders(indexer) {
  const assetAddressesMap = getAssetAddresses(indexer.blockHash);
  if (isEmpty(assetAddressesMap)) {
    return;
  }

  for (const [assetId, addresses] of Object.entries(assetAddressesMap)) {
    await updateAssetHolders(parseInt(assetId), addresses, indexer);
  }
  clearAssetAddresses(indexer.blockHash);
}

module.exports = {
  batchUpdateAssetHolders,
};
