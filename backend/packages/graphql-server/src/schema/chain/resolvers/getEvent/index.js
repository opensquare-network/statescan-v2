const { getBlockData } = require("../getBlock");
const {
  chain: { getBlockIndexer },
  env: { currentChain },
} = require("@osn/scan-common");
const {
  utils: { getFixedBlockIndexer },
} = require("@statescan/common");

async function getEventData(api, blockHeight, eventIndex) {
  const blockData = await getBlockData(api, blockHeight);

  // no block
  if (blockData === null) {
    return null;
  }

  const event = blockData?.events?.[eventIndex];
  if (!event) {
    return null;
  }

  let blockIndexer = getBlockIndexer(blockData.block.block);
  blockIndexer = getFixedBlockIndexer(
    blockIndexer,
    blockData.block.block,
    currentChain(),
  );

  return {
    event,
    indexer: {
      ...blockIndexer,
      eventIndex,
    },
  };
}

module.exports = { getEventData };
