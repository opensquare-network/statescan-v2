const {
  palletAsset: {
    getActiveAsset,
    getTransferCol,
    getHolderCol,
    getAssetTimelineCol,
  },
} = require("@statescan/mongo");
const isNil = require("lodash.isnil");

async function statistic(_, _args) {
  const { assetId, assetHeight: assetHeightArg } = _args;

  let assetHeight = assetHeightArg;
  if (isNil(assetHeight)) {
    const asset = await getActiveAsset(assetId);
    if (!asset) {
      throw new Error(`No active asset: ${assetId}`);
    }
    assetHeight = asset.assetHeight;
  }

  const transferCol = await getTransferCol();
  const transferCount = await transferCol.countDocuments({
    assetId,
    assetHeight,
  });

  const holderCol = await getHolderCol();
  const holderCount = await holderCol.countDocuments({ assetId, assetHeight });

  const timelineCol = await getAssetTimelineCol();
  const timelineCount = await timelineCol.countDocuments({
    assetId,
    assetHeight,
  });

  return {
    assetId,
    assetHeight,
    transferCount,
    holderCount,
    timelineCount,
  };
}

module.exports = {
  statistic,
};
