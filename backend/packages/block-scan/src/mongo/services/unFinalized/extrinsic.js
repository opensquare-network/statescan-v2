const { block: { getUnFinalizedExtrinsicCollection } } = require("@statescan/mongo");

async function batchUpsertUnFinalizedExtrinsics(extrinsics = []) {
  if (extrinsics.length <= 0) {
    return
  }

  const col = await getUnFinalizedExtrinsicCollection();
  const bulk = col.initializeUnorderedBulkOp();
  for (const extrinsic of extrinsics) {
    const { indexer } = extrinsic;
    bulk.find({
      'indexer.blockHeight': indexer.blockHeight,
      'indexer.extrinsicIndex': indexer.extrinsicIndex,
    }).upsert().update({
      $set: {
        ...extrinsic
      }
    })
  }

  await bulk.execute();
}

module.exports = {
  batchUpsertUnFinalizedExtrinsics,
}
