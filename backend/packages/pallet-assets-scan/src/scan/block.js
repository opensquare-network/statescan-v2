const { handleEvents } = require("./events");
const { doJobsAfterBlock } = require("./jobs");
const {
  chain: { getBlockIndexer },
} = require("@osn/scan-common");

async function handleBlock({ block, events }) {
  const blockIndexer = getBlockIndexer(block);

  await handleEvents(events, blockIndexer, block.extrinsics);
  await doJobsAfterBlock(blockIndexer);
}

module.exports = {
  handleBlock,
};
