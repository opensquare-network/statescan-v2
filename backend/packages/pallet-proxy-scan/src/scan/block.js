const {
  chain: { getBlockIndexer },
} = require("@osn/scan-common");
const { handleExtrinsics } = require("./extrinsics");
const { handleEvents } = require("./events");
const { doJobsAfterBlock } = require("./jobs");

async function handleBlock({ block, events }) {
  const blockIndexer = getBlockIndexer(block);

  await handleExtrinsics(block.extrinsics, events, blockIndexer);
  await handleEvents(events, blockIndexer, block.extrinsics);

  await doJobsAfterBlock(blockIndexer);
}

module.exports = {
  handleBlock,
};
