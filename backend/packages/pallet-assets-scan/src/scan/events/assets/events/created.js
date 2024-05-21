const {
  palletAsset: { insertPalletAssetTimeline },
} = require("@statescan/mongo");
const { insertAsset } = require("./common/insertAsset");

async function handleCreated(event, indexer) {
  const { method, data } = event;
  const assetId = data[0].toNumber();
  await insertAsset(assetId, indexer);

  const creator = data[1].toString();
  const owner = data[2].toString();
  const args = {
    assetId,
    creator,
    owner,
  };
  await insertPalletAssetTimeline(assetId, method, args, indexer);
}

module.exports = {
  handleCreated,
};
