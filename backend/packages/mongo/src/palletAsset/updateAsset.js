const isEmpty = require("lodash.isempty");
const { getAssetCol } = require("./db");
const { getActiveAsset } = require("./getAsset");
const { logger } = require("@osn/scan-common");

async function updateActiveAsset(assetId, updates = {}, indexer) {
  if (isEmpty(updates)) {
    return;
  }

  const activeAsset = await getActiveAsset(assetId);
  if (!activeAsset) {
    logger.error(`Can not find active asset ${assetId}`);
  }

  const col = await getAssetCol();
  await col.updateOne({ assetId, destroyed: false }, { $set: updates });
}

module.exports = {
  updateActiveAsset,
};
