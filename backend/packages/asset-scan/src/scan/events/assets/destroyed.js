const { deleteAssetHolders } = require("../../../service/assets/holders");
const { deleteAssetApprovals } = require("../../../service/assets/approval");
const { saveAssets } = require("../../../service/assets/updateAssets");
const {
  batchInsertAssetsTransfers,
} = require("../../../service/assets/batchInsertTransfers");
const { insertAssetTimeline } = require("../../mongo/assets/insertTimeline");
const { updateActiveAsset } = require("../../mongo/assets/updateAsset");

async function handleDestroyed(event, indexer) {
  const { method, data } = event;
  const assetId = data[0].toNumber();
  await insertAssetTimeline(assetId, method, {}, indexer);

  await batchInsertAssetsTransfers(indexer);
  await saveAssets(indexer);

  await deleteAssetHolders(assetId, indexer);
  await deleteAssetApprovals(assetId, indexer);
  await updateActiveAsset(assetId, { destroyed: true });
}

module.exports = {
  handleDestroyed,
};
