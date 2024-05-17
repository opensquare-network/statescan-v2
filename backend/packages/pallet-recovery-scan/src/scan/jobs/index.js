const {
  palletRecovery: { getRecoveryDb },
} = require("@statescan/mongo");
const { saveKnownHeight } = require("./saveKnownHeight");
const { updateRecoverProxiesConditional } = require("./proxy");

async function doJobsAfterBlock(indexer) {
  const height = indexer.blockHeight;
  const db = await getRecoveryDb();
  await db.updateScanHeight(height);

  await updateRecoverProxiesConditional(indexer);
  await saveKnownHeight(indexer);
}

module.exports = {
  doJobsAfterBlock,
};
