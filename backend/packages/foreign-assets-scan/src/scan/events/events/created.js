const { queryAndInsertAsset } = require("../../common/queryAndInsertAsset");
const {
  foreignAsset: { insertForeignAssetTimeline },
} = require("@statescan/mongo");

async function handleCreated(event, indexer) {
  const { method, data } = event;
  const assetId = data[0].hash.toString();
  await queryAndInsertAsset(assetId, data[0], indexer);

  const creator = data[1].toString();
  const owner = data[2].toString();
  const args = {
    assetId,
    creator,
    owner,
  };

  await insertForeignAssetTimeline(assetId, method, args, indexer);
}

module.exports = {
  handleCreated,
};
