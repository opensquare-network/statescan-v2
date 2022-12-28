const {
  block: { getExtrinsicCollection },
} = require("@statescan/mongo");

async function batchInsertExtrinsics(extrinsics = []) {
  if (extrinsics.length <= 0) {
    return;
  }

  const col = await getExtrinsicCollection();
  const bulk = col.initializeUnorderedBulkOp();
  for (const extrinsic of extrinsics) {
    bulk.insert(extrinsic);
  }
  await bulk.execute();
}

module.exports = {
  batchInsertExtrinsics,
};
