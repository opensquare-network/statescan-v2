const { getAssetAddresses } = require("../../store/assetsAccounts");
const isEmpty = require("lodash.isempty");
const {
  foreignAsset: { getForeignAsset, getHolderCol },
} = require("@statescan/mongo");
const { queryForeignAssetsAccounts } = require("../query/account");
const { bigGt } = require("@statescan/common/src/utils/bigInt");

async function updateForeignAssetHolders(assetId, addresses, indexer) {
  const assetAccounts = await queryForeignAssetsAccounts(
    assetId,
    addresses,
    indexer.blockHash,
  );

  const col = await getHolderCol();
  const bulk = col.initializeUnorderedBulkOp();
  for (const assetAccount of assetAccounts) {
    const { address, info } = assetAccount;
    const balance = info?.balance || 0;

    if (!bigGt(balance, 0)) {
      bulk.find({ assetId, address }).delete();
    } else {
      bulk.find({ assetId, address }).upsert().update({ $set: info });
    }
  }

  if (bulk.length > 0) {
    await bulk.execute();
  }
}

async function batchUpdateForeignAssetHolders(indexer) {
  const assetAddressesMap = getAssetAddresses(indexer.blockHash);
  if (isEmpty(assetAddressesMap)) {
    return;
  }

  for (const [assetId, addresses] of Object.entries(assetAddressesMap)) {
    await updateForeignAssetHolders(assetId, addresses, indexer);
  }
}

module.exports = {
  batchUpdateForeignAssetHolders,
};
