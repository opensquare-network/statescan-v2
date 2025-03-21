const {
  foreignAsset: { getAssetCol },
} = require("@statescan/mongo");

async function foreignAsset(_, _args) {
  const { id } = _args;

  let q = { assetId: id };
  const col = await getAssetCol();
  return await col.findOne(q, { projection: { _id: 0 } });
}

module.exports = {
  foreignAsset,
};
