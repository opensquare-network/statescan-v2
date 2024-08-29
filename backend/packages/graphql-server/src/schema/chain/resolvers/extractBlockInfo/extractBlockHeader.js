const { extractAuthor } = require("@polkadot/api-derive/type/util");
const { keccakAsHex } = require("@polkadot/util-crypto");

function extractBlockHeader(header, validators) {
  if (!header) {
    return;
  }

  const {
    extrinsicsRoot,
    number,
    parentHash,
    stateRoot,
    hash: rawHash,
    digest,
  } = header;
  const author = extractAuthor(digest, validators);
  let hash = rawHash.toString();
  if (process.env.CHAIN === "gargantua") {
    hash = keccakAsHex(header.toU8a(), 256);
  }

  return {
    height: number.toNumber(),
    hash,
    extrinsicsRoot: extrinsicsRoot.toHex(),
    parentHash: parentHash.toHex(),
    stateRoot: stateRoot.toHex(),
    validator: author?.toString(),
    digest: digest.toJSON(),
  };
}

module.exports = {
  extractBlockHeader,
};
