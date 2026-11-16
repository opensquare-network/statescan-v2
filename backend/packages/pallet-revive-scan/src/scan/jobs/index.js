const {
  palletRevive: { getReviveDb },
} = require("@statescan/mongo");
const {
  known: { saveKnownHeight },
} = require("@statescan/common");

async function doJobsAfterBlock(indexer) {
  const db = await getReviveDb();
  await db.updateScanHeight(indexer.blockHeight);

  await saveKnownHeight(indexer);
}

module.exports = {
  doJobsAfterBlock,
};
