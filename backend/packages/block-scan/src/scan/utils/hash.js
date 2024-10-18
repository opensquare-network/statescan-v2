const { keccakAsHex } = require("@polkadot/util-crypto");
const {
  env: { currentChain },
} = require("@osn/scan-common");

function getFixedBlockIndexer(indexer, block) {
  if (!["gargantua", "nexus"].includes(currentChain())) {
    return indexer;
  }

  const headerU8a = block.header.toU8a();
  const blockHash = keccakAsHex(headerU8a, 256);
  return {
    ...indexer,
    blockHash,
  };
}

function getExtrinsicHash(extrinsic) {
  if (!["gargantua", "nexus"].includes(currentChain())) {
    return extrinsic.hash.toHex();
  }

  return keccakAsHex(extrinsic.toU8a(), 256);
}

module.exports = {
  getFixedBlockIndexer,
  getExtrinsicHash,
};
