const { getActiveAssetOrThrow } = require("./getAsset");
const { getApprovalCol } = require("./db");

async function deleteApprovals(assetId, indexer) {
  const asset = await getActiveAssetOrThrow(assetId, indexer.blockHeight);
  if (!asset) {
    return;
  }
  const col = await getApprovalCol();
  await col.deleteMany({ assetId, assetHeight: asset.assetHeight });
}

module.exports = {
  deleteApprovals,
};
