const {
  chain: { findBlockApi },
} = require("@osn/scan-common");
const { getForeignAssetsSection } = require("../../../consts/section");
const { queryForeignAssetLocation } = require("../../common/getLocation");

async function queryForeignAsset(blockHash, location) {
  const section = getForeignAssetsSection();
  const blockApi = await findBlockApi(blockHash);
  const raw = await blockApi.query[section].asset(location);
  return raw.toJSON();
}

async function queryForeignAssetById(blockHash, assetId) {
  const location = await queryForeignAssetLocation(blockHash, assetId);
  if (!location) {
    return null;
  }
  return queryForeignAsset(blockHash, location);
}

module.exports = {
  queryForeignAsset,
  queryForeignAssetById,
};
