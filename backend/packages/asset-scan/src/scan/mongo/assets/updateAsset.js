const {
  asset: { getAssetCol },
} = require("@statescan/mongo");
const { logger } = require("@osn/scan-common");
const isEmpty = require("lodash.isempty");
const { getActiveAsset } = require("./getActiveAsset");

async function updateActiveAsset(assetId, updates = {}) {
  if (isEmpty(updates)) {
    return;
  }

  const col = await getAssetCol();
  const activeAsset = await getActiveAsset(assetId);
  if (!activeAsset) {
    logger.error(`Can not find active asset ${assetId}`);
  }

  await col.updateOne({ assetId, destroyed: false }, { $set: updates });
}

module.exports = {
  updateActiveAsset,
};
