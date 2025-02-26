const { extractExtrinsicInfo } = require("./extractExtrinsicInfo");
const { getExtrinsicData } = require("./getExtrinsic");
const { chainCall } = require("../../../chainApi");

async function extrinsic(_, _args) {
  const { blockHeight, extrinsicIndex } = _args;
  return await chainCall(async (api) => {
    const extrinsicData = await getExtrinsicData(
      api,
      blockHeight,
      extrinsicIndex,
    );
    return await extractExtrinsicInfo(api, extrinsicData);
  });
}

module.exports = {
  chainExtrinsic: extrinsic,
};
