const {
  asset: { getAssetActivityCol },
} = require("@statescan/mongo");
const { getActiveAsset } = require("./getActiveAsset");
const isNil = require("lodash.isnil");
const {
  logger,
} = require("@osn/scan-common");

async function insertAssetActivity(assetId, name, args = {}, indexer) {
  if (isNil(assetId)) {
    return;
  }

  const activeAsset = await getActiveAsset(assetId);
  if (!activeAsset) {
    logger.error(`Can not find asset: ${assetId} when insert activity at ${indexer.blockHeight}`);
    return;
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
