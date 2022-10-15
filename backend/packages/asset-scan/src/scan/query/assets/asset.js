const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

async function queryAsset(blockHash, assetId) {
  const blockApi = await findBlockApi(blockHash);
  const raw = await blockApi.query.assets.asset(assetId);
  return raw.toJSON();
}

module.exports = {
  queryAsset,
};
