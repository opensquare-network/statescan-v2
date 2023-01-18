const { HttpError } = require("../../../utils/httpError");
const {
  asset: {
    getAssetCol,
    getTransferCollection,
    getAssetHolderCol,
    getAssetTimelineCol,
  },
} = require("@statescan/mongo");
const isNil = require("lodash.isnil");
const { AssetModule } = require("../common/consts");

async function countAssetTransfers(assetId, assetHeight) {
  const col = await getTransferCollection();
  return await col.countDocuments({
    assetId: parseInt(assetId),
    assetHeight: parseInt(assetHeight),
    assetModule: AssetModule.assets,
  });
}

async function countAssetHolders(assetId, assetHeight) {
  const col = await getAssetHolderCol();
  return await col.countDocuments({
    assetId: parseInt(assetId),
    assetHeight: parseInt(assetHeight),
    balance: { $ne: 0 },
  });
}

async function countAssetTimeline(assetId, assetHeight) {
  const col = await getAssetTimelineCol();
  return await col.countDocuments({
    assetId: parseInt(assetId),
    assetHeight: parseInt(assetHeight),
    assetModule: AssetModule.assets,
  });
}

async function getAsset(ctx) {
  const { height, assetId } = ctx.params;
  let q = {
    assetId: parseInt(assetId),
    module: AssetModule.assets,
  };

  if (isNil(height)) {
    q = { ...q, destroyed: false };
  } else {
    q = { ...q, assetHeight: parseInt(height) };
  }

  const col = await getAssetCol();
  const asset = await col.findOne(q, { projection: { _id: 0 } });
  if (!asset) {
    throw new HttpError(404, "asset not found");
  }

  const transfersCount = await countAssetTransfers(
    asset.assetId,
    asset.assetHeight,
  );
  const holdersCount = await countAssetHolders(
    asset.assetId,
    asset.assetHeight,
  );
  const timelineCount = await countAssetTimeline(
    asset.assetId,
    asset.assetHeight,
  );

  ctx.body = {
    ...asset,
    transfersCount,
    holdersCount,
    timelineCount,
  };
}

module.exports = {
  getAsset,
};
