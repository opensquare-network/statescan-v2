const {
  palletAsset: { getAssetCol },
} = require("@statescan/mongo");

async function assets(_, _args) {
  const { offset, limit } = _args;
  if (parseInt(limit) > 100) {
    throw new Error("Over max page size 100");
  }

  const col = await getAssetCol();
  const assets = await col
    .find({ destroyed: false }, { projection: { _id: 0 } })
    .sort({ assetId: 1 })
    .skip(offset)
    .limit(limit)
    .toArray();
  const total = await col.estimatedDocumentCount();

  return {
    assets,
    offset,
    limit,
    total,
  };
}

module.exports = {
  assets,
};
