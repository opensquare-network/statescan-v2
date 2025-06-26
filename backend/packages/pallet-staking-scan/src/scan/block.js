const {
  chain: { getBlockIndexer },
} = require("@osn/scan-common");
const {
  palletStaking: { getStakingDb },
} = require("@statescan/mongo");
const { handleEvents } = require("./events");
const { doJobsAfterBlock } = require("./jobs");

async function handleBlock({ block, events }, updateHeight = true) {
  const blockIndexer = getBlockIndexer(block);
  await handleEvents(events, blockIndexer);

  await doJobsAfterBlock(blockIndexer);
  if (updateHeight) {
    const db = await getStakingDb();
    await db.updateScanHeight(blockIndexer.blockHeight);
  }
}

module.exports = {
  handleBlock,
};
