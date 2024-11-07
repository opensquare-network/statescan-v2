const { getBlockData } = require("../getBlock");
const {
  chain: { getBlockIndexer },
  env: { currentChain },
} = require("@osn/scan-common");
const {
  utils: { getFixedBlockIndexer },
} = require("@statescan/common");

async function getExtrinsicData(api, blockHeight, extrinsicIndex) {
  const blockData = await getBlockData(api, blockHeight);

  // no block
  if (blockData === null) {
    return null;
  }

  const extrinsic = blockData?.block?.block?.extrinsics?.[extrinsicIndex];
  if (!extrinsic) {
    return null;
  }

  let blockIndexer = getBlockIndexer(blockData.block.block);
  blockIndexer = getFixedBlockIndexer(
    blockIndexer,
    blockData.block.block,
    currentChain(),
  );

  return {
    extrinsic,
    allBlockEvents: blockData?.events,
    indexer: {
      ...blockIndexer,
      extrinsicIndex,
    },
  };
}

module.exports = { getExtrinsicData };
