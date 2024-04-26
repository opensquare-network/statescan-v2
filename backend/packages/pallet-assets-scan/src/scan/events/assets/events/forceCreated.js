const {
  palletAsset: { insertPalletAssetTimeline },
} = require("@statescan/mongo");
const { insertAsset } = require("./common/insertAsset");

async function handleForceCreated(event, indexer) {
  const { method, data } = event;
  const assetId = data[0].toNumber();
  await insertAsset(assetId, indexer);

  const owner = data[1].toString();
  const args = { assetId, owner };
  await insertPalletAssetTimeline(assetId, method, args, indexer);
}

module.exports = {
  handleForceCreated,
};
