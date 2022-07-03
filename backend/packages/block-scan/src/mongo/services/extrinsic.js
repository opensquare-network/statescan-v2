const { getExtrinsicCollection } = require("../index");

async function batchUpsertExtrinsics(extrinsics = []) {
  if (extrinsics.length <= 0) {
    return
  }

  const col = await getExtrinsicCollection();
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
  batchUpsertExtrinsics,
}
