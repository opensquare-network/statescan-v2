const {
  palletAsset: { getAssetCol },
} = require("@statescan/mongo");

async function deleteFrom(height) {
  if (!height) {
    throw new Error("No height given when deleting unFinalized transfers");
  }

  const assetCol = await getAssetCol();
  await assetCol.deleteMany({ assetHeight: { $gte: height } });

  // todo: delete business
}

module.exports = {
  deleteFrom,
};
