const { queryAndInsertAsset } = require("../../common/queryAndInsertAsset");

async function handleCreated(event, indexer) {
  const { method, data } = event;
  const assetId = data[0].hash.toString();
  await queryAndInsertAsset(assetId, data[0], indexer);
}

module.exports = {
  handleCreated,
};
