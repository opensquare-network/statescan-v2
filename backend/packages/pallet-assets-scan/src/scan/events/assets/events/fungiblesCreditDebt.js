const { updateAssetDetail } = require("./common/updateAssetDetail");
const {
  palletAsset: { insertPalletAssetActivity },
} = require("@statescan/mongo");

async function handleFungiblesCreditDebt(event, indexer) {
  const { data } = event;
  const assetId = data[0].toNumber();
  const amount = data[1].toString();

  await updateAssetDetail(assetId, indexer);
  await insertPalletAssetActivity(assetId, event.method, { amount }, indexer);
}

module.exports = {
  handleFungiblesCreditDebt,
};
