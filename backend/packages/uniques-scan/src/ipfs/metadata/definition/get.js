const { fetchJson } = require("../../axios/json");
const { isDefinitionValid, normalizeDefinition } = require("../content");
const { isCid } = require("../../utils/isCid");
const { extractCid } = require("../../utils/extractCid");
const { hexToString } = require("@polkadot/util");

/**
 *
 * @returns {Promise<{
 *   valid: <Boolean>,
 *   definition: <Object|null>
 * }>}
 *
 * - valid: indicate whether the definition is valid
 * - definition: will be null if valid is false, will be object if valid is true.
 */
async function getDefinition(hexData) {
  const data = hexToString(hexData);

  // definition maybe defined in IPFS content, while data gives the content IPFS CID.
  const maybeCid = extractCid(data);
  let json;
  if (await isCid(maybeCid)) {
    json = await fetchJson(maybeCid);
  }

  // definition maybe defined directly with the hex data, in JSON format.
  try {
    json = JSON.parse(data);
  } catch (e) {
    return {
      valid: false,
    };
  }

  const valid = await isDefinitionValid(json);
  if (!valid) {
    return { valid };
  }

  return {
    valid,
    definition: await normalizeDefinition(json),
  };
}

module.exports = {
  getDefinition,
};
