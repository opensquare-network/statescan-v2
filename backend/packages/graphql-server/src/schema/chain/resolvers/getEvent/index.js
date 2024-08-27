const { getBlockData } = require("../getBlock");
const { extractBlockTime } = require("../extractBlockInfo/extractBlockTime");
const {
  extractBlockHeader,
} = require("../extractBlockInfo/extractBlockHeader");

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

  const headerInfo = extractBlockHeader(
    blockData.block.block.header,
    blockData.validators,
  );
  const time = extractBlockTime(blockData.block.block);

  const indexer = {
    blockHash: headerInfo.hash,
    blockHeight: headerInfo.height,
    blockTime: time,
    eventIndex,
  };

  return {
    event,
    indexer,
  };
}

module.exports = { getEventData };
