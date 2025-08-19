const {
  chain: { getBlockIndexer },
} = require("@osn/scan-common");
const {
  store: { setBlockEvents, clearBlockEvents },
} = require("@statescan/common");
const { handleExtrinsics } = require("./extrinsics");
const { handleEvents } = require("./events");
const { doJobsAfterBlock } = require("./jobs");
const { handleKnownBusiness } = require("./known");

async function handleBlock({ block, events }) {
  const blockIndexer = getBlockIndexer(block);
  setBlockEvents(blockIndexer.blockHeight, events);

  await handleExtrinsics(block.extrinsics, events, blockIndexer);
  await handleEvents(events, blockIndexer, block.extrinsics);
  await handleKnownBusiness(blockIndexer);

  await doJobsAfterBlock(blockIndexer);
  clearBlockEvents(blockIndexer.blockHeight);
}

module.exports = {
  handleBlock,
};
