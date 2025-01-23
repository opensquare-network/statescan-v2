function normalizeBlock(block, validator, events, blockIndexer) {
  const {
    blockHeight: height,
    blockHash: hash,
    blockTime: timestamp,
  } = blockIndexer;

  return {
    height,
    hash,
    time: new Date(timestamp),
    validator,
    eventsCount: (events || []).length,
    extrinsicsCount: (block.extrinsics || []).length,
  };
}

module.exports = {
  normalizeBlock,
};
