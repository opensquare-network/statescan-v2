const { insertAssetTimeline } = require("../../mongo/assets/insertTimeline");
const { updateAssetDetail } = require("./common/updateAssetDetail");

async function handleIssued(event, indexer) {
  const { method, data } = event;
  const assetId = data[0].toNumber();

  await updateAssetDetail(assetId, indexer);
  await insertAssetTimeline(
    {
      assetId,
      name: method,
      args: {
        beneficiary: data[1].toString(),
        amount: data[2].toString(),
      },
    },
    indexer,
  );
}

module.exports = {
  handleIssued,
};
