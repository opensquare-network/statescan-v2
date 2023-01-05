/**
 * This file provides util functions to check NFT definitions.
 */

const { isHex, hexToString } = require("@polkadot/util");
const { isCid } = require("../utils/isCid");

async function lowercaseObjectKey(obj = {}) {
  return Object.entries(obj).reduce((result, [key, value]) => {
    const lowercaseKey = (key || "").toLowerCase();
    result[lowercaseKey] = value;

    return result;
  }, {});
}

const ipfsUrlPrefixes = ["ipfs://ipfs/", "ipfs://", ""];

async function _isValidImageUrl(url = "") {
  let normalized = url;
  if (isHex(url)) {
    normalized = hexToString(url);
  }

  const lowerCased = normalized.toLowerCase();
  for (const prefix of ipfsUrlPrefixes) {
    if (
      lowerCased.startsWith(prefix) &&
      (await isCid(normalized.slice(prefix.length)))
    ) {
      return true;
    }
  }

  return false;
}

function _extractCidFromImageUrl(url = "") {
  let normalized = url;
  if (isHex(url)) {
    normalized = hexToString(url);
  }

  const lowerCased = normalized.toLowerCase();
  for (const prefix of ipfsUrlPrefixes) {
    if (lowerCased.startsWith(prefix)) {
      return normalized.slice(prefix.length);
    }
  }

  return null;
}

/**
 * Check whether a NFT class/instance definition is valid;
 * @param definition
 * @returns {boolean}
 */
async function isDefinitionValid(definition = {}) {
  const { image } = definition;
  if (!image) {
    return false;
  }

  return _isValidImageUrl(image);
}

async function normalizeDefinition(definition = {}) {
  if (!isDefinitionValid(definition)) {
    throw new Error(`Normalize invalid definition`);
  }

  return {
    ...definition,
    image: _extractCidFromImageUrl(definition.image),
  };
}

module.exports = {
  lowercaseObjectKey,
  isDefinitionValid,
  normalizeDefinition,
};
