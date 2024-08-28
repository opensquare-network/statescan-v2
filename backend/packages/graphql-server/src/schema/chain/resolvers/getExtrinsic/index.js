const { getBlockData } = require("../getBlock");
// const { extractBlockTime } = require("../extractBlockInfo/extractBlockTime");
// const {
//   extractBlockHeader,
// } = require("../extractBlockInfo/extractBlockHeader");
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

  // const headerInfo = extractBlockHeader(
  //   blockData.block.block.header,
  //   blockData.validators,
  // );

  const indexer = getBlockIndexer(blockData.block.block);
  // const time = extractBlockTime(blockData.block.block);

  // const indexer = {
  //   blockHash: headerInfo.hash,
  //   blockHeight: headerInfo.height,
  //   blockTime: time,
  //   extrinsicIndex,
  // };

  return {
    extrinsic,
    allBlockEvents: blockData?.events,
    indexer,
  };
}

module.exports = { getExtrinsicData };
