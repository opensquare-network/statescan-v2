const { queryForeignAsset } = require("../../../query/assets/assets");
const {
  foreignAsset: { updateForeignAsset },
} = require("@statescan/mongo");
const { queryForeignAssetLocation } = require("../../../common/getLocation");

async function updateForeignAssetDetailById(assetId, indexer) {
  const location = await queryForeignAssetLocation(indexer.blockHash, assetId);
  if (!location) {
    return;
  }

  await updateForeignAssetDetailByLocation(location, indexer);
}

async function updateForeignAssetDetailByLocation(location, indexer) {
  const assetId = location.hash.toString();
  const detail = await queryForeignAsset(indexer.blockHash, location);
  await updateForeignAsset(assetId, { detail });
}

module.exports = {
  updateForeignAssetDetailByLocation,
  updateForeignAssetDetailById,
};
