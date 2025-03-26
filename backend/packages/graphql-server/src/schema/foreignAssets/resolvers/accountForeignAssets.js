const {
  foreignAsset: { getHolderCol, getAllForeignAssets },
} = require("@statescan/mongo");

async function getHoldersWithAsset(holders) {
  const assets = await getAllForeignAssets();
  return (holders || []).map((holder) => {
    const asset = assets.find((asset) => asset.assetId === holder.assetId);
    return {
      ...holder,
      asset,
    };
  });
}

async function accountForeignAssets(_, _args) {
  const { offset, limit, address } = _args;
  if (parseInt(limit) > 100) {
    throw new Error("Over max page size 100");
  }

  const q = { address };
  const col = await getHolderCol();
  const holders = await col
    .find(q, { projection: { _id: 0 } })
    .sort({ assetId: 1 })
    .skip(offset)
    .limit(limit)
    .toArray();
  const total = await col.countDocuments(q);

  const normalizedHolders = await getHoldersWithAsset(holders);
  return {
    holders: normalizedHolders,
    offset,
    limit,
    total,
  };
}

module.exports = {
  accountForeignAssets,
};
