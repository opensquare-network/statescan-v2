const {
  palletStaking: { getStakingDb },
} = require("@statescan/mongo");

async function doJobsAfterBlock(blockIndexer) {
  const db = await getStakingDb();
  await db.updateScanHeight(blockIndexer.blockHeight);
}

module.exports = {
  doJobsAfterBlock,
};