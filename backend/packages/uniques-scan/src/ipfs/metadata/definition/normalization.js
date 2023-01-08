/**
 * This file provides util functions to check NFT definitions.
 */

const { isCid } = require("../../utils/isCid");
const { extractCid } = require("../../utils/extractCid");

function lowercaseObjectKey(obj = {}) {
  return Object.entries(obj).reduce((result, [key, value]) => {
    const lowercaseKey = (key || "").toLowerCase();
    result[lowercaseKey] = value;

    return result;
  }, {});
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

  const maybeCid = extractCid(image);
  if (await isCid(maybeCid)) {
    return true;
  }

  // note: image field maybe not a IPFS CID, while it maybe a SVG image source.
  //   Check: https://github.com/opensquare-network/statescan/issues/1054
  return true;
}

async function normalizeDefinition(definition = {}) {
  const isValid = await isDefinitionValid(definition);
  if (!isValid) {
    throw new Error(`Normalize invalid definition`);
  }

  const keyLowercase = lowercaseObjectKey(definition);
  return {
    ...keyLowercase,
    image: extractCid(keyLowercase.image),
  };
}

module.exports = {
  isDefinitionValid,
  normalizeDefinition,
};
