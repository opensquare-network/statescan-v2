const { extractExtrinsicInfo } = require("./extractExtrinsicInfo");
const { getExtrinsicData } = require("./getExtrinsic");
const { chainCall } = require("../../../chainApi");

async function extrinsic(_, _args) {
  const { blockHeight, extrinsicIndex } = _args;
  const extrinsicData = await chainCall((api) =>
    getExtrinsicData(api, blockHeight, extrinsicIndex),
  );
  return extractExtrinsicInfo(extrinsicData);
}

module.exports = {
  extrinsic,
};
