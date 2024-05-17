const {
  chain: { getBlockIndexer },
} = require("@osn/scan-common");
const { handleEvents } = require("./events");
const { doJobsAfterBlock } = require("./jobs");
const { handleExtrinsics } = require("./extrinsics");

async function handleBlock({ block, events }) {
  const blockIndexer = getBlockIndexer(block);
  await handleEvents(events, blockIndexer, block.extrinsics);
  await handleExtrinsics(block.extrinsics, events, blockIndexer);

  await doJobsAfterBlock(blockIndexer);
}

module.exports = {
  handleBlock,
};
