const {
  foreignAsset: { getAssetCol },
} = require("@statescan/mongo");
const isEmpty = require("lodash.isempty");

function extractSort(sort) {
  const commonSort = { assetHeight: 1 };
  if ("HOLDERS_DESC" === sort) {
    return {
      "detail.accounts": -1,
      ...commonSort,
    };
  }

  return commonSort;
}

async function foreignAssets(_, _args) {
  const { offset, limit, sort } = _args;
  if (parseInt(limit) > 100) {
    throw new Error("Over max page size 100");
  }

  const sortObj = extractSort(sort);
  const q = {};
  const col = await getAssetCol();
  const assets = await col
    .find(q, { projection: { _id: 0 } })
    .sort(sortObj)
    .skip(offset)
    .limit(limit)
    .toArray();
  let total;
  if (isEmpty(q)) {
    total = await col.estimatedDocumentCount();
  } else {
    total = await col.countDocuments(q);
  }

  return {
    assets,
    offset,
    limit,
    total,
  };
}

module.exports = {
  foreignAssets,
};
