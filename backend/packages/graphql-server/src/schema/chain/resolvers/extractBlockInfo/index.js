const extractExtrinsics = require("./extractExtrinsics");
const extractEvents = require("./extractEvents");
const extractBlockHeader = require("./extractBlockHeader");
const extractBlockTime = require("./extractBlockTime");

function extractBlockInfo(blockData) {
  if (!blockData) {
    return;
  }

  const headerInfo = extractBlockHeader(
    blockData.block.block.header,
    blockData.validators,
  );
  const time = extractBlockTime(blockData.block.block);

  const blockIndexer = {
    blockHash: headerInfo.hash,
    blockHeight: headerInfo.height,
    blockTime: time,
  };

  const extrinsics = extractExtrinsics(
    blockData.block.block.extrinsics,
    blockData.events,
    blockIndexer,
  );
  const events = extractEvents(blockData.events, blockIndexer);

  return {
    ...headerInfo,
    time,
    eventsCount: blockData.events.length,
    extrinsicsCount: blockData.block.block.extrinsics.length,
    extrinsics,
    events,
  };
}

module.exports = {
  extractBlockInfo,
};
