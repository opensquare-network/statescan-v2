const { getBlockData } = require("../getBlock");
const {
  chain: { getBlockIndexer },
} = require("@osn/scan-common");

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

  const blockIndexer = getBlockIndexer(blockData.block.block);

  return {
    event,
    indexer: {
      ...blockIndexer,
      eventIndex,
    },
  };
}

module.exports = { getEventData };
