const {
  foreignAsset: { getForeignAssetDb },
} = require("@statescan/mongo");
const { saveKnownHeight } = require("./saveKnownHeight");

async function doJobsAfterBlock(indexer) {
  const height = indexer.blockHeight;
  const db = await getForeignAssetDb();
  await db.updateScanHeight(height);

  await saveKnownHeight(indexer);
}

module.exports = {
  doJobsAfterBlock,
};
