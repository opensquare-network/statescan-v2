const { isHex, hexToString } = require("@polkadot/util");

const ipfsUrlPrefixes = ["ipfs://ipfs/", "ipfs://", ""];

/**
 * Remove possible prefix protocol info from ipfs url
 */
function extractCid(url = "") {
  const normalized = isHex(url) ? hexToString(url) : url;

  const lowerCased = normalized.toLowerCase();
  for (const prefix of ipfsUrlPrefixes) {
    if (lowerCased.startsWith(prefix)) {
      return normalized.slice(prefix.length);
    }
  }

  return normalized;
}

module.exports = {
  extractCid,
};
