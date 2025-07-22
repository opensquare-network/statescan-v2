const { queryMetadataByBlockHash } = require("../chain/metadata");
const blockHashMetadataMap = {};

async function getMetadataByBlockHash(blockHash) {
  const saved = blockHashMetadataMap[blockHash];
  if (saved) {
    return saved;
  }

  const metadata = await queryMetadataByBlockHash(blockHash);
  blockHashMetadataMap[blockHash] = metadata;
  return metadata;
}

function clearMetadataFromStore(blockHash) {
  delete blockHashMetadataMap[blockHash];
}

module.exports = {
  getMetadataByBlockHash,
  clearMetadataFromStore,
};
