const {
  utils: { chainFieldToString },
} = require("@statescan/common");
const {
  chain: { findBlockApi },
} = require("@osn/scan-common");
const { getAssetsSection } = require("../../../consts/section");

async function queryMetadata(blockHash, assetId) {
  const blockApi = await findBlockApi(blockHash);

  const section = getAssetsSection();
  const raw = await blockApi.query[section].metadata(assetId);
  const json = raw.toJSON();
  return {
    ...json,
    name: chainFieldToString(raw.name),
    symbol: chainFieldToString(raw.symbol),
  };
}

module.exports = {
  queryMetadata,
};
