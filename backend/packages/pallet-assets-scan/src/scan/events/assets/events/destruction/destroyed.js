const { flushAssetsData } = require("../../../flush");
const {
  palletAsset: {
    insertPalletAssetTimeline,
    deleteHolders,
    deleteApprovals,
    updateActiveAsset,
  },
} = require("@statescan/mongo");

async function handleDestroyed(event, indexer) {
  await flushAssetsData(indexer);

  const { method, data } = event;
  const assetId = data[0].toNumber();
  await insertPalletAssetTimeline(assetId, method, {}, indexer);

  await deleteHolders(assetId, indexer.blockHeight);
  await deleteApprovals(assetId, indexer);

  await updateActiveAsset(assetId, { destroyed: true, destroyedAt: indexer });
}

module.exports = {
  handleDestroyed,
};
