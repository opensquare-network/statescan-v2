const { xxhashAsHex } = require("@polkadot/util-crypto");

function generateMultisigId(
  multisigAccount,
  callHash,
  blockHeight,
  extrinsicIndex,
) {
  return xxhashAsHex(multisigAccount + callHash + blockHeight + extrinsicIndex);
}

module.exports = {
  generateMultisigId,
};
