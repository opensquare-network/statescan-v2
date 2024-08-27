const { extractEvents } = require("./extractBlockInfo/extractEvents");
const { extractExtrinsics } = require("./extractBlockInfo/extractExtrinsics");
const { extractBlockTime } = require("./extractBlockInfo/extractBlockTime");
const { extractBlockHeader } = require("./extractBlockInfo/extractBlockHeader");
const { chainCall } = require("../../../chainApi");
const { getBlockData } = require("./getBlock");

function extractBlockInfo(blockData) {
  if (!blockData) {
    return null;
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

async function block(_, _args) {
  const { blockHeight } = _args;
  const blockData = await chainCall((api) => getBlockData(api, blockHeight));
  return extractBlockInfo(blockData);
}

module.exports = {
  block,
};
