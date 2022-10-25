const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

async function queryApproval(blockHash, assetId, owner, delegate) {
  const blockApi = await findBlockApi(blockHash);

  const raw = await blockApi.query.assets.approvals(assetId, owner, delegate);
  return raw.toJSON();
}

module.exports = {
  queryApproval,
};
