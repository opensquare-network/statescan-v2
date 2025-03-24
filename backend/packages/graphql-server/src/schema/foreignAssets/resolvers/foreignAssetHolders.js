const {
  foreignAsset: { getHolderCol, getAssetCol },
} = require("@statescan/mongo");

async function getHoldersWithAsset(assetId, holders) {
  const col = await getAssetCol();
  const asset = await col.findOne({ assetId }, { projection: { _id: 0 } });
  return (holders || []).map((holder) => ({
    ...holder,
    asset,
  }));
}

async function foreignAssetHolders(_, _args) {
  const { offset, limit, assetId } = _args;
  if (parseInt(limit) > 100) {
    throw new Error("Over max page size 100");
  }

  const q = { assetId };
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
    holders: await getHoldersWithAsset(assetId, holders),
    offset,
    limit,
    total,
  };
}

module.exports = {
  foreignAssetHolders,
};
