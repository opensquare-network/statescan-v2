const { HttpError } = require("../../../utils/httpError");
const {
  asset: { getAssetCol },
} = require("@statescan/mongo");
const isNil = require("lodash.isnil");

async function getAsset(ctx) {
  const { height, assetId } = ctx.params;
  let q = {
    assetId: parseInt(assetId),
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

  ctx.body = asset;
}

module.exports = {
  getAsset,
};
