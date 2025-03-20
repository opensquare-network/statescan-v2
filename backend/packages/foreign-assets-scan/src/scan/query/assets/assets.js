const {
  chain: { findBlockApi },
} = require("@osn/scan-common");
const { getForeignAssetsSection } = require("../../../consts/section");

async function queryForeignAsset(blockHash, location) {
  const section = getForeignAssetsSection();
  const blockApi = await findBlockApi(blockHash);
  const raw = await blockApi.query[section].asset(location);
  return raw.toJSON();
}

module.exports = {
  queryForeignAsset,
};
