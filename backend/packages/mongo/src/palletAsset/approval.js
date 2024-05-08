const { getActiveAssetOrThrow } = require("./getAsset");
const { getApprovalCol } = require("./db");

async function deleteApprovals(assetId, indexer) {
  const asset = await getActiveAssetOrThrow(assetId, indexer.blockHeight);
  const col = await getApprovalCol();
  await col.deleteMany({ assetId, assetHeight: asset.assetHeight });
}

module.exports = {
  deleteApprovals,
};
