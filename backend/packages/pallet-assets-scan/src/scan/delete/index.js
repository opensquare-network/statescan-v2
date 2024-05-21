const {
  palletAsset: { getAssetCol, getAssetTimelineCol, getTransferCol },
} = require("@statescan/mongo");

async function deleteFrom(height) {
  if (!height) {
    throw new Error("No height given when deleting unFinalized transfers");
  }

  const assetCol = await getAssetCol();
  await assetCol.deleteMany({ assetHeight: { $gte: height } });

  const timelineCol = await getAssetTimelineCol();
  await timelineCol.deleteMany({ "indexer.blockHeight": { $gte: height } });
  // todo: delete business

  const transferCol = await getTransferCol();
  await transferCol.deleteMany({ "indexer.blockHeight": { $gte: height } });
}

module.exports = {
  deleteFrom,
};
