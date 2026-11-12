const { isEthereumAddress } = require("@polkadot/util-crypto");
const { encodeAddressByChain } = require("../../../../utils/address");
const { hasRevive } = require("../../../../env");
const {
  utils: { isValidAddress },
} = require("@statescan/common");

async function queryAccount(term = "") {
  // An EVM address only has an account page on chains with the revive module.
  if (isEthereumAddress(term)) {
    return hasRevive() ? term.toLowerCase() : null;
  }

  if (!isValidAddress(term)) {
    return null;
  }

  return encodeAddressByChain(term);
}

module.exports = {
  queryAccount,
};
