const { handleEvents } = require("./events");
const {
  chain: { getBlockIndexer },
} = require("@osn/scan-common");
const { doJobsAfterBlock } = require("./jobs");

async function handleBlock({ block, events }) {
  const blockIndexer = getBlockIndexer(block);
  await handleEvents(events, blockIndexer, block.extrinsics);

  await doJobsAfterBlock(blockIndexer);
}

module.exports = {
  handleBlock,
};
