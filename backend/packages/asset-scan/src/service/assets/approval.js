const { queryApproval } = require("../../scan/query/assets/approval");
const isEmpty = require("lodash.isempty");
const {
  getActiveAssetOrThrow,
} = require("../../scan/mongo/assets/getActiveAsset");
const {
  asset: { getAssetApprovalCol },
} = require("@statescan/mongo");
const {
  utils: { toDecimal128 },
} = require("@statescan/common");

async function deleteAssetApprovals(assetId, indexer) {
  const asset = await getActiveAssetOrThrow(assetId, indexer.blockHeight);
  const col = await getAssetApprovalCol();
  await col.deleteMany({ assetId, assetHeight: asset.assetHeight });
}

async function updateApproval(assetId, owner, delegate, indexer) {
  const asset = await getActiveAssetOrThrow(assetId, indexer.blockHeight);
  const approval = await queryApproval(
    indexer.blockHash,
    assetId,
    owner,
    delegate,
  );
  const col = await getAssetApprovalCol();
  if (isEmpty(approval)) {
    await col.deleteOne({
      assetId,
      assetHeight: asset.assetHeight,
      owner,
      delegate,
    });

    return;
  }

  await col.updateOne(
    {
      assetId,
      assetHeight: asset.assetHeight,
      owner,
      delegate,
    },
    {
      $set: {
        ...approval,
        amount: toDecimal128(approval.amount),
        deposit: toDecimal128(approval.deposit),
      },
    },
    { upsert: true },
  );
}

module.exports = {
  updateApproval,
  deleteAssetApprovals,
};
