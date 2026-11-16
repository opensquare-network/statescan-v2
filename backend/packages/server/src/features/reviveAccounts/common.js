const { isEthereumAddress } = require("@polkadot/util-crypto");
const {
  utils: { isValidAddress },
} = require("@statescan/common");
const { getAddressQuery } = require("../../common/getAddressQuery");

// A mapped EVM address and its substrate account are the same account, so the
// calls of both callers belong to the account page.
function getAccountCallerQuery(evmAddress, substrateAddress) {
  const queries = [{ caller: evmAddress }];

  if (
    typeof substrateAddress === "string" &&
    !isEthereumAddress(substrateAddress) &&
    isValidAddress(substrateAddress)
  ) {
    queries.push(getAddressQuery("caller", substrateAddress));
  }

  return queries.length > 1 ? { $or: queries } : queries[0];
}

function getSubstrateCallerQuery(address) {
  if (
    typeof address !== "string" ||
    isEthereumAddress(address) ||
    !isValidAddress(address)
  ) {
    return null;
  }

  return getAddressQuery("caller", address);
}

module.exports = {
  getAccountCallerQuery,
  getSubstrateCallerQuery,
};
