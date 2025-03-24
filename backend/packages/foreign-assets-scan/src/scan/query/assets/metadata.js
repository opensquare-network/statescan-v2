const { getForeignAssetsSection } = require("../../../consts/section");
const {
  chain: { findBlockApi },
} = require("@osn/scan-common");
const {
  utils: { chainFieldToString },
} = require("@statescan/common");

async function queryForeignAssetMetadata(blockHash, location) {
  const section = getForeignAssetsSection();
  const blockApi = await findBlockApi(blockHash);
  const raw = await blockApi.query[section].metadata(location);
  const json = raw.toJSON();
  return {
    ...json,
    name: chainFieldToString(raw.name),
    symbol: chainFieldToString(raw.symbol),
  };
}

module.exports = {
  queryForeignAssetMetadata,
};
