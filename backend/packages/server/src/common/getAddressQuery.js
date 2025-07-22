const { encodeAddress } = require("@polkadot/util-crypto");
const {
  getSs58FormatOrThrow,
  hasLegacySs58Format,
  getLegacySs58FormatOrThrow,
} = require("../utils/consts/chains");
const { currentChain } = require("../env");

function getMultiAddressQuery(fieldName, address, chain) {
  const ss58Format = getSs58FormatOrThrow(chain);
  const chainAddress = encodeAddress(address, ss58Format);

  const legacySs58Format = getLegacySs58FormatOrThrow(chain);
  const legacyChainAddress = encodeAddress(address, legacySs58Format);

  return {
    [fieldName]: {
      $in: [chainAddress, legacyChainAddress],
    },
  };
}

function getAddressQuery(fieldName, address) {
  const chain = currentChain();
  if (hasLegacySs58Format(chain)) {
    return getMultiAddressQuery(fieldName, address, chain);
  }

  return {
    [fieldName]: address,
  };
}

module.exports = {
  getAddressQuery,
};
