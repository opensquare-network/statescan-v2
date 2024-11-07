const { extractExtrinsics } = require("./extractExtrinsics");
const { extractEvents } = require("./extractEvents");
const { extractBlockHeader } = require("./extractBlockHeader");
const {
  chain: { getBlockIndexer },
  env: { currentChain },
} = require("@osn/scan-common");
const {
  utils: { getFixedBlockIndexer },
} = require("@statescan/common");

function extractBlockInfo(blockData) {
  if (!blockData) {
    return;
  }

  const headerInfo = extractBlockHeader(
    blockData.block.block.header,
    blockData.validators,
  );

  let blockIndexer = getBlockIndexer(blockData.block.block);
  blockIndexer = getFixedBlockIndexer(
    blockIndexer,
    blockData.block.block,
    currentChain(),
  );

  const time = blockIndexer.blockTime;

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
