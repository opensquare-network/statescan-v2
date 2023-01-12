const {
  asset: { getAssetCol },
} = require("@statescan/mongo");
const {
  utils: { isValidAddress },
} = require("@statescan/common");
const { isHash, isNum, escapeRegex } = require("../../../../utils");

async function handleAssetId(term) {
  const assetId = parseInt(term);
  if (isNaN(assetId)) {
    return [];
  }

  const assetCol = await getAssetCol();
  return await assetCol.find({ assetId, destroyed: false }).toArray();
}

async function handleAssetSymbolOrName(term) {
  if (term.length < 2) {
    return [];
  }

  if (isHash(term)) {
    return [];
  }

  if (isValidAddress(term)) {
    return [];
  }

  const regex = new RegExp(`${escapeRegex(term)}`, "i");

  const assetCol = await getAssetCol();
  return await assetCol
    .find({
      destroyed: false,
      $or: [{ "metadata.name": regex }, { "metadata.symbol": regex }],
    })
    .sort({ name: 1 })
    .limit(5)
    .toArray();
}

async function queryAssets(term = "") {
  let result = null;

  if (isNum(term)) {
    result = await handleAssetId(term);
  } else {
    result = await handleAssetSymbolOrName(term);
  }

  if (result?.length > 0) {
    return result;
  }

  return null;
}

module.exports = {
  queryAssets,
};
