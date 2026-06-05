const {
  asset: {
    getTransferCollection,
    getAssetTimelineCol,
    getAssetCol,
    getAssetActivityCol,
  },
} = require("@statescan/mongo");

async function deleteFrom(height) {
  if (!height) {
    throw new Error("No height given when deleting unFinalized transfers");
  }

  const assetCol = await getAssetCol();
  await assetCol.deleteMany({ assetHeight: { $gte: height } });

  const transferCol = await getTransferCollection();
  await transferCol.deleteMany({ "indexer.blockHeight": { $gte: height } });

  const timelineCol = await getAssetTimelineCol();
  await timelineCol.deleteMany({ "indexer.blockHeight": { $gte: height } });

  const activityCol = await getAssetActivityCol();
  await activityCol.deleteMany({ "indexer.blockHeight": { $gte: height } });
}

module.exports = {
  deleteFrom,
};
