const { xxhashAsHex } = require("@polkadot/util-crypto");

function generateProxyId(delegator, delegatee, proxyType, delay) {
  return xxhashAsHex(delegator + delegatee + proxyType + delay);
}

function generateAnnouncementId(delegate, real, callHash, height) {
  return xxhashAsHex(delegate + real + callHash + height);
}

module.exports = {
  generateProxyId,
  generateAnnouncementId,
};
