const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

async function queryMetadata(blockHash, assetId) {
  const blockApi = await findBlockApi(blockHash);

  const raw = await blockApi.query.assets.metadata(assetId);
  const json = raw.toJSON();
  return {
    ...json,
    name: raw.name.toHuman(),
    symbol: raw.symbol.toHuman(),
  };
}

module.exports = {
  queryMetadata,
};
