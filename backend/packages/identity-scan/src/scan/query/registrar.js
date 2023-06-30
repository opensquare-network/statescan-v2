const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

async function queryRegistrars(indexer) {
  const blockApi = await findBlockApi(indexer.blockHash);
  return await blockApi.query.identity.registrars();
}

module.exports = {
  queryRegistrars,
};
