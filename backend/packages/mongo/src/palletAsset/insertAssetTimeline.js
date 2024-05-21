const isNil = require("lodash.isnil");
const { getActiveAssetOrThrow } = require("./getAsset");
const { getAssetTimelineCol } = require("./db");

async function insertPalletAssetTimeline(assetId, name, args = {}, indexer) {
  if (isNil(assetId)) {
    return;
  }

  const activeAsset = await getActiveAssetOrThrow(assetId, indexer.blockHeight);
  const timelineCol = await getAssetTimelineCol();
  await timelineCol.insertOne({
    assetId,
    assetHeight: activeAsset.assetHeight,
    name,
    args,
    indexer,
  });
}

module.exports = {
  insertPalletAssetTimeline,
};
