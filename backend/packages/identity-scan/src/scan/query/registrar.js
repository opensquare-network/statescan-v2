const { getBlockApiConditionally } = require("../common/api");

async function queryRegistrars(indexer) {
  const blockApi = await getBlockApiConditionally(indexer.blockHash);
  return await blockApi.query.identity.registrars();
}

module.exports = {
  queryRegistrars,
};
