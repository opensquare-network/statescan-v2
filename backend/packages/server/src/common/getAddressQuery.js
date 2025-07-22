const { encodeAddress } = require("@polkadot/util-crypto");
const { chains, getSs58Format } = require("../utils/consts/chains");
const { currentChain } = require("../env");

function getNexusAddressQuery(fieldName, address) {
  const ss58Format = getSs58Format(currentChain());
  const substrateAddress = encodeAddress(address, 42);
  const polkadotAddress = encodeAddress(address, ss58Format);
  return {
    [fieldName]: {
      $in: [substrateAddress, polkadotAddress],
    },
  };
}

function getAddressQuery(fieldName, address) {
  const chain = currentChain();
  if (chain === chains.nexus) {
    return getNexusAddressQuery(fieldName, address);
  }

  return {
    [fieldName]: address,
  };
}

module.exports = {
  getAddressQuery,
};
