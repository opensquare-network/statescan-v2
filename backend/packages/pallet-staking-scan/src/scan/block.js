const {
  chain: { getBlockIndexer },
} = require("@osn/scan-common");
const {
  palletStaking: { getStakingDb },
} = require("@statescan/mongo");
const { handleEvents } = require("./events");
const { doJobsAfterBlock } = require("./jobs");
const {
  store: { setBlockEvents, clearBlockEvents, clearMetadataFromStore },
} = require("@statescan/common");
const { clearBlockValidators } = require("./store/blockValidators");

async function handleBlock({ block, events }, updateHeight = true) {
  const blockIndexer = getBlockIndexer(block);
  setBlockEvents(blockIndexer.blockHeight, events);
  await handleEvents(events, blockIndexer, block.extrinsics);

  await doJobsAfterBlock(blockIndexer);
  if (updateHeight) {
    const db = await getStakingDb();
    await db.updateScanHeight(blockIndexer.blockHeight);
  }
  clearBlockEvents(blockIndexer.blockHeight);
  clearBlockValidators(blockIndexer.blockHash);
  clearMetadataFromStore(blockIndexer.blockHash);
}

module.exports = {
  handleBlock,
};
