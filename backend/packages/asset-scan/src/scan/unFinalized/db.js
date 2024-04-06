const {
  asset: { getUnFinalizedTransferCol, getAssetDb },
} = require("@statescan/mongo");

const unFinalizedScanName = "un-finalized-scan-height";

async function deleteUnFinalizedLte(height) {
  if (!height) {
    throw new Error("No height given when deleting unFinalized transfers");
  }

  const col = await getUnFinalizedTransferCol();
  await col.deleteMany({ "indexer.blockHeight": { $lte: height } });
}

async function deleteAllUnFinalizedData() {
  const col = await getUnFinalizedTransferCol();
  await col.deleteMany({});
}

async function batchUpsertTransfers(transfers = []) {
  if (transfers.length <= 0) {
    return;
  }

  const col = await getUnFinalizedTransferCol();
  const bulk = col.initializeUnorderedBulkOp();
  for (const transfer of transfers) {
    const { indexer } = transfer;
    bulk
      .find({
        "indexer.blockHeight": indexer.blockHeight,
        "indexer.eventIndex": indexer.eventIndex,
      })
      .upsert()
      .update({
        $set: {
          ...transfer,
        },
      });
  }

  await bulk.execute();
}

async function updateUnFinalizedHeight(height) {
  const db = await getAssetDb();
  const statusCol = await db.getStatusCol();

  await statusCol.updateOne(
    { name: unFinalizedScanName },
    { $set: { value: height } },
    { upsert: true },
  );
}

async function getUnFinalizedScanHeight() {
  const db = await getAssetDb();
  const statusCol = await db.getStatusCol();

  const heightInfo = await statusCol.findOne({ name: unFinalizedScanName });
  if (heightInfo) {
    return parseInt(heightInfo.value);
  }

  return null;
}

module.exports = {
  deleteUnFinalizedLte,
  batchUpsertTransfers,
  updateUnFinalizedHeight,
  getUnFinalizedScanHeight,
  deleteAllUnFinalizedData,
};
