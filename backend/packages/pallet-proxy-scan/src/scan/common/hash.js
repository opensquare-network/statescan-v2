const { xxhashAsHex } = require("@polkadot/util-crypto");

function generateProxyId(delegator, delegatee, proxyType, delay) {
  return xxhashAsHex(delegator + delegatee + proxyType + delay);
}

module.exports = {
  generateProxyId,
};
