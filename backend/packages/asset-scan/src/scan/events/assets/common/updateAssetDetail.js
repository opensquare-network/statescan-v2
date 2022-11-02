const { updateActiveAsset } = require("../../../mongo/assets/updateAsset");
const { queryAsset } = require("../../../query/assets/asset");

async function updateAssetDetail(assetId, indexer) {
  const detail = await queryAsset(indexer.blockHash, assetId);
  await updateActiveAsset(assetId, { detail });
}

module.exports = {
  updateAssetDetail,
};
