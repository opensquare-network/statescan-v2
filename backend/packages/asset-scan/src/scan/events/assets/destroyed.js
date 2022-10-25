const { flushAssetsData } = require("../flush");
const { deleteAssetHolders } = require("../../../service/assets/holders");
const { deleteAssetApprovals } = require("../../../service/assets/approval");
const { insertAssetTimeline } = require("../../mongo/assets/insertTimeline");
const { updateActiveAsset } = require("../../mongo/assets/updateAsset");

async function handleDestroyed(event, indexer) {
  await flushAssetsData(indexer);

  const { method, data } = event;
  const assetId = data[0].toNumber();
  await insertAssetTimeline(assetId, method, {}, indexer);

  await deleteAssetHolders(assetId, indexer);
  await deleteAssetApprovals(assetId, indexer);

  await updateActiveAsset(assetId, { destroyed: true });
}

module.exports = {
  handleDestroyed,
};
