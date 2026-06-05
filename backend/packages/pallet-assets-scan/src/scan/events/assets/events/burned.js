const { updateAssetDetail } = require("./common/updateAssetDetail");
const { addAssetAddresses } = require("../../../../store/assetsAccounts");
const {
  palletAsset: { insertPalletAssetActivity },
} = require("@statescan/mongo");

async function handleBurned(event, indexer) {
  const { data } = event;
  const assetId = data[0].toNumber();
  const owner = data[1].toString();
  const balance = data[2].toBigInt().toString();

  await updateAssetDetail(assetId, indexer);
  await insertPalletAssetActivity(
    assetId,
    event.method,
    { owner, balance },
    indexer,
  );
  addAssetAddresses(indexer.blockHash, assetId, [owner]);
}

module.exports = {
  handleBurned,
};
