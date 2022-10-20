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

  await updateActiveAsset(assetId, { destroyed: true });
  // todo: 2. delete all holders
  // todo: 3. delete all approvals
}

module.exports = {
  handleDestroyed,
};
