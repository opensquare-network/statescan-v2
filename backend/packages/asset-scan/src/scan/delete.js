const {
  asset: { getTransferCollection, getAssetTimelineCol },
} = require("@statescan/mongo");

async function deleteFrom(height) {
  if (!height) {
    throw new Error("No height given when deleting unFinalized transfers");
  }

  const col = await getTransferCollection();
  await col.deleteMany({ "indexer.blockHeight": { $gte: height } });

  const timelineCol = await getAssetTimelineCol();
  await timelineCol.deleteMany({ "indexer.blockHeight": { $gte: height } });
}

module.exports = {
  deleteFrom,
};
