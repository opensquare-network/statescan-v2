const {
  asset: { getUnFinalizedTransferCol },
} = require("@statescan/mongo");

async function deleteUnFinalizedFrom(height) {
  if (!height) {
    throw new Error("No height given when deleting unFinalized transfers");
  }

  const col = await getUnFinalizedTransferCol();
  await col.deleteMany({ "indexer.blockHeight": { $lte: height } });
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

module.exports = {
  deleteUnFinalizedFrom,
  batchUpsertTransfers,
};
