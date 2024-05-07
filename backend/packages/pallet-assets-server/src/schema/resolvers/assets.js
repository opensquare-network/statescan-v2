const {
  palletAsset: { getAssetCol },
} = require("@statescan/mongo");

function extractSort(sort) {
  if ("HOLDERS_DESC" === sort) {
    return { "detail.accounts": -1 };
  }

  return { assetId: 1 };
}

async function assets(_, _args) {
  const { offset, limit, sort, destroyed } = _args;
  if (parseInt(limit) > 100) {
    throw new Error("Over max page size 100");
  }

  const sortObj = extractSort(sort);
  const q = { destroyed: destroyed };
  const col = await getAssetCol();
  const assets = await col
    .find(q, { projection: { _id: 0 } })
    .sort(sortObj)
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
