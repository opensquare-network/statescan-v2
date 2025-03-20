const { queryAndInsertAsset } = require("../../common/queryAndInsertAsset");
const {
  foreignAsset: { insertForeignAssetTimeline },
} = require("@statescan/mongo");

async function handleForceCreated(event, indexer) {
  const { method, data } = event;
  const assetId = data[0].hash.toString();
  await queryAndInsertAsset(assetId, data[0], indexer);

  const owner = data[1].toString();
  const args = { assetId, owner };
  await insertForeignAssetTimeline(assetId, method, args, indexer);
}

module.exports = {
  handleForceCreated,
};
