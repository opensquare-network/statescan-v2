const { getAssetActivityCol } = require("./db");
const { getActiveAssetOrThrow } = require("./getAsset");
const isNil = require("lodash.isnil");

async function insertPalletAssetActivity(assetId, name, args = {}, indexer) {
  if (isNil(assetId)) {
    return;
  }

  const activeAsset = await getActiveAssetOrThrow(assetId, indexer.blockHeight);
  const col = await getAssetActivityCol();
  await col.insertOne({
    assetId,
    assetHeight: activeAsset.assetHeight,
    module: activeAsset.module,
    name,
    args,
    indexer,
  });
}

module.exports = {
  insertPalletAssetActivity,
};
