const {
  palletAsset: { getAssetCol },
} = require("@statescan/mongo");
const isNil = require("lodash.isnil");

async function asset(_, _args) {
  const { id, height } = _args;

  let q = { assetId: id };
  if (isNil(height)) {
    q = { ...q, destroyed: false };
  } else {
    q = { ...q, assetHeight: height };
  }

  const col = await getAssetCol();
  return await col.findOne(q, { projection: { _id: 0 } });
}

module.exports = {
  asset,
};
