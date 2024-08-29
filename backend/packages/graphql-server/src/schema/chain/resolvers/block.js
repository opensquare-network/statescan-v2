const { chainCall } = require("../../../chainApi");
const { getBlockData } = require("./getBlock");
const { extractBlockInfo } = require("./extractBlockInfo");

async function block(_, _args) {
  const { blockHeightOrHash } = _args;
  const blockData = await chainCall((api) =>
    getBlockData(api, blockHeightOrHash),
  );
  return extractBlockInfo(blockData);
}

module.exports = {
  chainBlock: block,
};
