const {
  palletAsset: { getHolderCol, getActiveAsset },
} = require("@statescan/mongo");
const isNil = require("lodash.isnil");

async function holders(_, _args) {
  const { offset, limit, assetId, assetHeight: assetHeightArg } = _args;
  if (parseInt(limit) > 100) {
    throw new Error("Over max page size 100");
  }

  let assetHeight = assetHeightArg;
  if (isNil(assetHeight)) {
    const asset = await getActiveAsset(assetId);
    if (!asset) {
      throw new Error(`No active asset: ${assetId}`);
    }
    assetHeight = asset.assetHeight;
  }

  const q = { assetId, assetHeight };
  const col = await getHolderCol();
  const holders = await col
    .find(q, { projection: { _id: 0 } })
    .sort({ balance: -1 })
    .collation({ locale: "en_US", numericOrdering: true })
    .skip(offset)
    .limit(limit)
    .toArray();
  const total = await col.countDocuments(q);

  return {
    holders,
    offset,
    limit,
    total,
  };
}

module.exports = {
  holders,
};
