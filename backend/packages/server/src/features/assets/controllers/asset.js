const { HttpError } = require("../../../utils/httpError");
const {
  asset: { getAssetCol },
} = require("@statescan/mongo");

async function getAsset(ctx) {
  const { height, assetId } = ctx.params;
  const col = await getAssetCol();
  const q = {
    assetHeight: parseInt(height),
    assetId: parseInt(assetId),
  };

  const asset = await col.findOne(q, { projection: { _id: 0 } });
  if (!asset) {
    throw new HttpError(404, "asset not found");
  }

  ctx.body = asset;
}

module.exports = {
  getAsset,
};
