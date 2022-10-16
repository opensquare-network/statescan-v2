const { insertAssetTimeline } = require("../../mongo/assets/insertTimeline");
const { updateAssetDetail } = require("./common/updateAssetDetail");

async function handleOwnerChanged(event, indexer) {
  const { method, data } = event;
  const assetId = data[0].toNumber();

  await updateAssetDetail(assetId, indexer);
  await insertAssetTimeline({
    assetId,
    indexer,
    name: method,
    args: { owner: data[1].toString },
  });
}

module.exports = {
  handleOwnerChanged,
};
