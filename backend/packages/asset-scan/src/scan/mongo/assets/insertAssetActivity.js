const {
  asset: { getAssetActivityCol },
} = require("@statescan/mongo");
const { getActiveAsset } = require("./getActiveAsset");
const isNil = require("lodash.isnil");

async function insertAssetActivity(assetId, name, args = {}, indexer) {
  if (isNil(assetId)) {
    return;
  }

  const activeAsset = await getActiveAsset(assetId);
  if (!activeAsset) {
    throw new Error(
      `Can not find asset: ${assetId} when insert activity at ${indexer.blockHeight}`,
    );
  }
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
  insertAssetActivity,
};
