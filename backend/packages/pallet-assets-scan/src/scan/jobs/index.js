const {
  palletAsset: { getAssetDb },
} = require("@statescan/mongo");
const { saveKnownHeight } = require("./saveKnownHeight");
const {
  chain: { getLatestFinalizedHeight },
} = require("@osn/scan-common");

async function doJobsAfterBlock(indexer) {
  const height = indexer.blockHeight;
  const db = getAssetDb();
  await db.updateScanHeight(height);

  await saveKnownHeight(indexer);

  const finalizedHeight = getLatestFinalizedHeight();
  if (height >= finalizedHeight - 100) {
    // todo: maybe handle un finalized
  }
}

module.exports = {
  doJobsAfterBlock,
};
