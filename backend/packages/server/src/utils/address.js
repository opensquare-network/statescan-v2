const { currentChain } = require("../env");
const { getSs58Format } = require("./consts/chains");
const { hexToU8a, isHex } = require("@polkadot/util");
const { decodeAddress, encodeAddress } = require("@polkadot/util-crypto");

function encodeAddressByChain(addr = "") {
  const ss58Format = getSs58Format(currentChain());
  return encodeAddress(
    isHex(addr) ? hexToU8a(addr) : decodeAddress(addr, ss58Format),
    ss58Format,
  );
}

module.exports = {
  encodeAddressByChain,
};
