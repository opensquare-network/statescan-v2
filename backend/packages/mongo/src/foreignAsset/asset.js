const { getAssetCol } = require("./db");
const isEmpty = require("lodash.isempty");

async function getForeignAsset(assetId) {
  const col = await getAssetCol();
  return await col.findOne({ assetId });
}

async function getAllForeignAssets() {
  const col = await getAssetCol();
  return await col
    .find({}, { projection: { _id: 0 } })
    .sort({ assetHeight: 1 })
    .toArray();
}

async function updateForeignAsset(assetId, updates = {}) {
  if (isEmpty(updates)) {
    return;
  }

  const col = await getAssetCol();
  await col.updateOne({ assetId }, { $set: updates });
}

module.exports = {
  getForeignAsset,
  updateForeignAsset,
  getAllForeignAssets,
};
