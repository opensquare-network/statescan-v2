const {
  foreignAsset: { updateForeignAsset, insertForeignAssetTimeline },
} = require("@statescan/mongo");
const { queryForeignAsset } = require("../../../query/assets/assets");

async function updateForeignAssetNoTimeline(event, indexer) {
  const { data } = event;
  const assetId = data[0].hash.toString();

  const detail = await queryForeignAsset(indexer.blockHash, data[0]);
  await updateForeignAsset(assetId, { detail });
}

async function updateForeignAssetCommon(event, indexer, timelineArgs = {}) {
  const { method, data } = event;
  const assetId = data[0].hash.toString();

  const detail = await queryForeignAsset(indexer.blockHash, data[0]);
  await updateForeignAsset(assetId, { detail });

  await insertForeignAssetTimeline(assetId, method, timelineArgs, indexer);
}

module.exports = {
  updateForeignAssetCommon,
  updateForeignAssetNoTimeline,
};
