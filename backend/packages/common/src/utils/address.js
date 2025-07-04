const { isEthereumAddress, encodeAddress } = require("@polkadot/util-crypto");

function isSameAddress(addr1, addr2) {
  if (!addr1 || !addr2) {
    return false;
  }

  if (addr1 === addr2) {
    return true;
  }

  if (isEthereumAddress(addr1) && isEthereumAddress(addr2)) {
    return addr1.toLowerCase() === addr2.toLowerCase();
  }

  try {
    return encodeAddress(addr1, 42) === encodeAddress(addr2, 42);
  } catch (e) {
    return false;
  }
}

module.exports = {
  isSameAddress,
};
