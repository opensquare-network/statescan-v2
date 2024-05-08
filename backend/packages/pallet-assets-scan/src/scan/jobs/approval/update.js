const {
  palletAsset: { getActiveAssetOrThrow, getApprovalCol },
} = require("@statescan/mongo");
const { queryApproval } = require("../../query/approval");
const isEmpty = require("lodash.isempty");

async function updateApproval(assetId, owner, delegate, indexer) {
  const asset = await getActiveAssetOrThrow(assetId, indexer.blockHeight);
  const approval = await queryApproval(
    indexer.blockHash,
    assetId,
    owner,
    delegate,
  );

  const col = await getApprovalCol();
  if (isEmpty(approval)) {
    await col.deleteOne({
      assetId,
      assetHeight: asset.assetHeight,
      owner,
      delegate,
    });
  } else {
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
        },
      },
      { upsert: true },
    );
  }
}

module.exports = {
  updateApproval,
};
