const { getActiveAsset } = require("../../scan/mongo/assets/getActiveAsset");
const {
  getAssetsTransfers,
  clearAssetsTransfers,
} = require("../../store/assetsTransfers");
const {
  asset: { getTransferCollection },
} = require("@statescan/mongo");

async function batchInsertAssetsTransfers(indexer) {
  const transfers = getAssetsTransfers(indexer.blockHash);
  if (transfers.length < 1) {
    return;
  }

  const assetIds = [...new Set(transfers.map((item) => item.assetId))];
  const promises = assetIds.map((assetId) => getActiveAsset(assetId));
  const assets = await Promise.all(promises);

  const col = await getTransferCollection();
  const bulk = col.initializeUnorderedBulkOp();
  for (const transfer of transfers) {
    const asset = assets.find((asset) => asset.assetId === transfer.assetId);
    if (!asset) {
      throw new Error(
        `Can not find asset: ${transfer.assetId} when insert transfer`,
      );
    }
    bulk.insert({
      ...transfer,
      assetHeight: asset.assetHeight,
    });
  }
  await bulk.execute();

  clearAssetsTransfers(indexer.blockHash);
}

module.exports = {
  batchInsertAssetsTransfers,
};
