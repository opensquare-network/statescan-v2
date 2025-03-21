const { doBatchJobAfterEvents } = require("../batch");
const {
  foreignAsset: {
    insertForeignAssetTimeline,
    getHolderCol,
    getAssetCol,
    getTransferCol,
    getAssetTimelineCol,
  },
} = require("@statescan/mongo");

async function handleDestroyed(event, indexer) {
  await doBatchJobAfterEvents(indexer);
  const { method, data } = event;
  const assetId = data[0].hash.toString();

  await insertForeignAssetTimeline(assetId, method, {}, indexer);

  const holderCol = await getHolderCol();
  await holderCol.deleteMany({ assetId });

  const transferCol = await getTransferCol();
  await transferCol.deleteMany({ assetId });

  const timelineCol = await getAssetTimelineCol();
  await timelineCol.deleteMany({ assetId });

  const assetCol = await getAssetCol();
  await assetCol.deleteOne({ assetId });
}

module.exports = {
  handleDestroyed,
};
