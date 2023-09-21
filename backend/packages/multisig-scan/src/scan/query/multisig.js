const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

async function queryMultisig(account, callHash, indexer) {
  const blockApi = await findBlockApi(indexer.blockHash);
  if (blockApi.query.multisig?.multisigs) {
    return await blockApi.query.multisig.multisigs(account, callHash);
  } else if (blockApi.query.utility?.multisigs) {
    return await blockApi.query.utility.multisigs(account, callHash);
  }

  throw new Error(`Can not get multisigs storage at ${indexer.blockHeight}`);
}

module.exports = {
  queryMultisig,
};
