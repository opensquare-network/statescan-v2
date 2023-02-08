/**
 * This file provides util functions to check NFT definitions.
 */

const { isCid } = require("../../utils/isCid");
const { extractCid } = require("../../utils/extractCid");
const {
  utils: { md5 },
} = require("@statescan/common");

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
  const { image, mediaUri } = definition;
  if (!image && !mediaUri) {
    return false;
  }

  const maybeCid = extractCid(image || mediaUri);
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
  const imageField = keyLowercase.image || keyLowercase.mediauri;
  return {
    ...keyLowercase,
    image: extractCid(imageField),
    imageHash: md5(imageField),
  };
}

module.exports = {
  isDefinitionValid,
  normalizeDefinition,
};
