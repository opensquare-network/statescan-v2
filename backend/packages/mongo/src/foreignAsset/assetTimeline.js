const isNil = require("lodash.isnil");
const { getAssetTimelineCol } = require("../palletAsset/db");

async function insertForeignAssetTimeline(assetId, name, args = {}, indexer) {
  if (isNil(assetId)) {
    return;
  }

  const timelineCol = await getAssetTimelineCol();
  await timelineCol.insertOne({
    assetId,
    name,
    args,
    indexer,
  });
}

module.exports = {
  insertForeignAssetTimeline,
};
