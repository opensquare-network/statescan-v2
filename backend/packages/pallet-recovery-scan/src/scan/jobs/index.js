const {
  palletRecovery: { getRecoveryDb },
} = require("@statescan/mongo");
const { saveKnownHeight } = require("./saveKnownHeight");

async function doJobsAfterBlock(indexer) {
  const height = indexer.blockHeight;
  const db = await getRecoveryDb();
  await db.updateScanHeight(height);

  await saveKnownHeight(indexer);
}

module.exports = {
  doJobsAfterBlock,
};
