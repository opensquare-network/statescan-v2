const { flushBlockData } = require("../batch");
const {
  foreignAsset: {
    insertForeignAssetTimeline,
    getHolderCol,
    getAssetCol,
    getTransferCol,
    getAssetTimelineCol,
  },
} = require("@statescan/mongo");

// we don't save records for destroyed asset
async function handleDestroyed(event, indexer) {
  await flushBlockData(indexer);
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
