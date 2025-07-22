const { encodeAddress } = require("@polkadot/util-crypto");
const { chains, getSs58Format } = require("../utils/consts/chains");
const { currentChain } = require("../env");

function getMultiAddressQuery(fieldName, address, chain) {
  const ss58Format = getSs58Format(chain);
  const chainAddress = encodeAddress(address, ss58Format);
  if (ss58Format === 42) {
    return {
      [fieldName]: chainAddress,
    };
  }

  const substrateAddress = encodeAddress(address, 42);
  return {
    [fieldName]: {
      $in: [substrateAddress, chainAddress],
    },
  };
}

function getAddressQuery(fieldName, address) {
  const chain = currentChain();
  if (chain === chains.nexus) {
    return getMultiAddressQuery(fieldName, address, chain);
  }

  return {
    [fieldName]: address,
  };
}

module.exports = {
  getAddressQuery,
};
