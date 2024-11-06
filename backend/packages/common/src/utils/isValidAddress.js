const { decodeAddress, encodeAddress } = require("@polkadot/keyring");
const { hexToU8a, isHex } = require("@polkadot/util");
const { isEthereumAddress } = require("@polkadot/util-crypto");

function isValidAddress(address = "") {
  if (isEthereumAddress(address)) {
    return true;
  }

  try {
    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));

    return true;
  } catch (error) {
    return false;
  }
}

module.exports = {
  isValidAddress,
};
