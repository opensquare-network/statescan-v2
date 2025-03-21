const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

// assetId is also hash
async function queryForeignAssetLocation(blockHash, assetId) {
  const blockApi = await findBlockApi(blockHash);
  const entries = await blockApi.query.foreignAssets.asset.entries();
  for (const [storageKey] of entries) {
    const arg = storageKey.args[0];
    if (arg.hash.toString() === assetId) {
      return arg;
    }
  }

  return null;
}

module.exports = {
  queryForeignAssetLocation,
};
