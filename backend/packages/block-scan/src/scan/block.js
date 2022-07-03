const omit = require("lodash.omit");

function normalizeBlock(block, validator, events, blockIndexer) {
  const {
    blockHeight: height,
    blockHash: hash,
    blockTime: time,
  } = blockIndexer;
  const header = block.header.toJSON();

  return {
    height,
    hash,
    time,
    validator,
    ...omit(header, ["number"]),
    eventsCount: (events || []).length,
    extrinsicsCount: (block.extrinsics || []).length,
  }
}

module.exports = {
  normalizeBlock,
}
