const { currentChain } = require("../env");
const { getSs58FormatOrThrow, chains } = require("./consts/chains");
const { hexToU8a, isHex } = require("@polkadot/util");
const { decodeAddress, encodeAddress } = require("@polkadot/util-crypto");
const { isEthereumAddress } = require("@polkadot/util-crypto");

function encodeAddressByChain(addr = "") {
  const chain = currentChain();
  if (
    [chains.laos, chains["datahaven-testnet"]].includes(chain) ||
    isEthereumAddress(addr)
  ) {
    return addr;
  }

  const ss58Format = getSs58FormatOrThrow(chain);
  return encodeAddress(
    isHex(addr) ? hexToU8a(addr) : decodeAddress(addr, ss58Format),
    ss58Format,
  );
}

module.exports = {
  encodeAddressByChain,
};
