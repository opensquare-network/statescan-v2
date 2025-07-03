const {
  chain: { getBlockIndexer },
} = require("@osn/scan-common");
const {
  palletStaking: { getStakingDb },
} = require("@statescan/mongo");
const { handleEvents } = require("./events");
const { doJobsAfterBlock } = require("./jobs");
const {
  store: { setHeightBlockEvents, clearHeightBlockEvents },
} = require("@statescan/common");
const { clearBlockValidators } = require("./store/blockValidators");

async function handleBlock({ block, events }, updateHeight = true) {
  const blockIndexer = getBlockIndexer(block);
  setHeightBlockEvents(blockIndexer.blockHeight, events);
  await handleEvents(events, blockIndexer);

  await doJobsAfterBlock(blockIndexer);
  if (updateHeight) {
    const db = await getStakingDb();
    await db.updateScanHeight(blockIndexer.blockHeight);
  }
  clearHeightBlockEvents(blockIndexer.blockHeight);
  clearBlockValidators(blockIndexer.blockHash);
}

module.exports = {
  handleBlock,
};
