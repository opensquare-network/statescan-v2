const { chainCall } = require("../../../chainApi");
const { getBlockData } = require("./getBlock");
const { extractBlockInfo } = require("./extractBlockInfo");

async function block(_, _args) {
  const { blockHeight } = _args;
  const blockData = await chainCall((api) => getBlockData(api, blockHeight));
  return extractBlockInfo(blockData);
}

module.exports = {
  block,
};
