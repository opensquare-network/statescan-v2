const {
  foreignAsset: { getTransferCol },
} = require("@statescan/mongo");
const { getAssetsTransfers } = require("../../store/assetsTransfers");

async function batchInsertForeignAssetsTransfers(indexer) {
  const transfers = getAssetsTransfers(indexer.blockHash);
  if (transfers.length < 1) {
    return;
  }

  const col = await getTransferCol();
  const bulk = col.initializeUnorderedBulkOp();
  for (const transfer of transfers) {
    bulk.insert(transfer);
  }
  await bulk.execute();
}

module.exports = {
  batchInsertForeignAssetsTransfers,
};
