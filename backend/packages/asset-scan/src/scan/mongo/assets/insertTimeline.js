const {
  asset: { getAssetTimelineCol },
} = require("@statescan/mongo");
const isEmpty = require("lodash.isempty");
const { getActiveAsset } = require("./getActiveAsset");
const isNil = require("lodash.isnil");
const {
  consts: { AssetModule },
} = require("@statescan/common");

async function insertAssetTimeline(timelineObj = {}, indexer) {
  if (isEmpty(timelineObj)) {
    return;
  }

  const timelineCol = await getAssetTimelineCol();

  const { assetId, assetHeight, module } = timelineObj;
  if (!isNil(assetHeight)) {
    await timelineCol.insertOne(timelineObj);
    return;
  }

  const activeAsset = await getActiveAsset(assetId);
  if (!activeAsset) {
    throw new Error(
      `Can not find asset: ${assetId} when MetadataSet at ${indexer.blockHeight}`,
    );
  }

  await timelineCol.insertOne({
    ...timelineObj,
    assetHeight,
    module,
  });
}

module.exports = {
  insertAssetTimeline,
};
