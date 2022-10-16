const {
  asset: { getAssetTimelineCol },
} = require("@statescan/mongo");
const isEmpty = require("lodash.isempty");
const { getActiveAsset } = require("./getActiveAsset");
const isNil = require("lodash.isnil");

function initObj(timelineObj = {}, indexer) {
  return { ...timelineObj, indexer };
}

async function insertAssetTimeline(timelineObj = {}, indexer) {
  if (isEmpty(timelineObj)) {
    return;
  }

  const timelineCol = await getAssetTimelineCol();
  const obj = initObj(timelineObj, indexer);
  const { assetId, assetHeight, module } = timelineObj;
  if (!isNil(assetHeight)) {
    await timelineCol.insertOne(obj);
    return;
  }

  const activeAsset = await getActiveAsset(assetId);
  if (!activeAsset) {
    throw new Error(
      `Can not find asset: ${assetId} when MetadataSet at ${indexer.blockHeight}`,
    );
  }

  Object.assign(obj, {
    assetHeight: activeAsset.assetHeight,
    module: activeAsset.module,
  });
  await timelineCol.insertOne(obj);
}

module.exports = {
  insertAssetTimeline,
};
