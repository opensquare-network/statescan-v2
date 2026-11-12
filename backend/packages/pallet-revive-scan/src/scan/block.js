const {
  chain: { getBlockIndexer },
} = require("@osn/scan-common");
const { handleEvents } = require("./events");
const { handleExtrinsics } = require("./extrinsics");
const { handleReviveContracts } = require("./contracts");
const { doJobsAfterBlock } = require("./jobs");

async function handleBlock({ block, events }) {
  const blockIndexer = getBlockIndexer(block);
  await handleEvents(events, blockIndexer, block.extrinsics);
  await handleExtrinsics(block.extrinsics, events, blockIndexer);
  await handleReviveContracts({ block, events, blockIndexer });

  await doJobsAfterBlock(blockIndexer);
}

module.exports = {
  handleBlock,
};
