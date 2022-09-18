const { queryBlockHash } = require("./queryBlockHash");
const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

async function getMetadata(blockHeight) {
  const blockHash = await queryBlockHash(blockHeight);
  const blockApi = await findBlockApi(blockHash);
  return blockApi.registry.metadata.toJSON();
}

module.exports = {
  getMetadata,
};
