const { keccakAsHex } = require("@polkadot/util-crypto");

function getFixedBlockIndexer(indexer, block, chain) {
  if (!["gargantua", "nexus"].includes(chain)) {
    return indexer;
  }

  const headerU8a = block.header.toU8a();
  const blockHash = keccakAsHex(headerU8a, 256);
  return {
    ...indexer,
    blockHash,
  };
}

function getExtrinsicHash(extrinsic, chain) {
  if (!["gargantua", "nexus"].includes(chain)) {
    return extrinsic.hash.toHex();
  }

  return keccakAsHex(extrinsic.toU8a(), 256);
}

module.exports = {
  getFixedBlockIndexer,
  getExtrinsicHash,
};
