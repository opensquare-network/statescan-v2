const {
  foreignAsset: { getTransferCol, getAssetTimelineCol, getAssetCol },
} = require("@statescan/mongo");

async function deleteFrom(height) {
  if (!height) {
    throw new Error(
      "No height given when deleting unFinalized business for foreign assets",
    );
  }

  const assetCol = await getAssetCol();
  await assetCol.deleteMany({ assetHeight: { $gte: height } });

  const timelineCol = await getAssetTimelineCol();
  await timelineCol.deleteMany({ "indexer.blockHeight": { $gte: height } });

  const transferCol = await getTransferCol();
  await transferCol.deleteMany({ "indexer.blockHeight": { $gte: height } });
}

module.exports = {
  deleteFrom,
};
