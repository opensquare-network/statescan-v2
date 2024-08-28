const { getBlockData } = require("../getBlock");
const {
  chain: { getBlockIndexer },
} = require("@osn/scan-common");

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

  const blockIndexer = getBlockIndexer(blockData.block.block);

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
