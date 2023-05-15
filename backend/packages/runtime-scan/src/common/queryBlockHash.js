const {
  chain: { getApi },
} = require("@osn/scan-common");

async function queryBlockHash(blockHeight) {
  const api = await getApi();
  return api.rpc.chain.getBlockHash(blockHeight);
}

module.exports = {
  queryBlockHash,
};
