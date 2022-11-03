const {
  asset: { getAssetCol },
} = require("@statescan/mongo");

async function queryAssets(assetIds = []) {
  if (assetIds.length <= 0) {
    return [];
  }

  let q;
  if (assetIds.length === 1) {
    q = assetIds[0];
  } else {
    q = { $or: assetIds };
  }

  const col = await getAssetCol();
  return await col.find(q, { projection: { _id: 0 } }).toArray();
}

module.exports = {
  queryAssets,
};
