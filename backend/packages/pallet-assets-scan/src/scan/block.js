const { handleEvents } = require("./events");
const { doJobsAfterBlock } = require("./jobs");
const {
  chain: { getBlockIndexer },
} = require("@osn/scan-common");
const { tryCreateStatistics } = require("./jobs/statistics");

async function handleBlock({ block, events }) {
  const blockIndexer = getBlockIndexer(block);

  await handleEvents(events, blockIndexer, block.extrinsics);
  await tryCreateStatistics(blockIndexer);

  await doJobsAfterBlock(blockIndexer);
}

module.exports = {
  handleBlock,
};
