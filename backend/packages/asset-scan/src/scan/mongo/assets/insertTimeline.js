const {
  asset: { getAssetTimelineCol },
} = require("@statescan/mongo");
const { getActiveAsset } = require("./getActiveAsset");
const isNil = require("lodash.isnil");

async function insertAssetTimeline(assetId, name, args = {}, indexer) {
  if (isNil(assetId)) {
    return;
  }

  const activeAsset = await getActiveAsset(assetId);
  if (!activeAsset) {
    throw new Error(
      `Can not find asset: ${assetId} when insert timeline at ${indexer.blockHeight}`,
    );
  }
  const timelineCol = await getAssetTimelineCol();
  await timelineCol.insertOne({
    assetId,
    assetHeight: activeAsset.assetHeight,
    module: activeAsset.module,
    name,
    args,
    indexer,
  });
}

module.exports = {
  insertAssetTimeline,
};
