const {
  chain: { findBlockApi },
} = require("@osn/scan-common");
const { getAssetsSection } = require("../../../consts/section");

async function queryAsset(blockHash, assetId) {
  const section = getAssetsSection();
  const blockApi = await findBlockApi(blockHash);
  const raw = await blockApi.query[section].asset(assetId);
  return raw.toJSON();
}

module.exports = {
  queryAsset,
};
