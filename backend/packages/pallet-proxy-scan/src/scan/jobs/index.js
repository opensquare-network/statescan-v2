const {
  palletProxy: { getProxyDb },
} = require("@statescan/mongo");
const {
  known: { saveKnownHeight },
} = require("@statescan/common");

async function doJobsAfterBlock(indexer) {
  const height = indexer.blockHeight;
  const db = await getProxyDb();
  await db.updateScanHeight(height);

  await saveKnownHeight(indexer);
}

module.exports = {
  doJobsAfterBlock,
};
