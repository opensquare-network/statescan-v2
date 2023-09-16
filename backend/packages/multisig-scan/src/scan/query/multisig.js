const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

async function queryMultisig(account, callHash, indexer) {
  const blockApi = await findBlockApi(indexer.blockHash);
  return await blockApi.query.multisig.multisigs(account, callHash);
}

module.exports = {
  queryMultisig,
};
