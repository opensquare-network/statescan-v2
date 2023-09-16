const { xxhashAsHex } = require("@polkadot/util-crypto");

function generateMultisigId(multisigAccount, callHash, when) {
  return xxhashAsHex(multisigAccount + callHash + when.height + when.index);
}

module.exports = {
  generateMultisigId,
};
