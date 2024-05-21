const { queryAsset } = require("../../../../query/assets/asset");
const {
  palletAsset: { updateActiveAsset },
} = require("@statescan/mongo");

async function updateAssetDetail(assetId, indexer) {
  const detail = await queryAsset(indexer.blockHash, assetId);
  await updateActiveAsset(assetId, { detail });
}

module.exports = {
  updateAssetDetail,
};
