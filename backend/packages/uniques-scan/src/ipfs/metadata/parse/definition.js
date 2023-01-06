const { fetchJson } = require("../../axios/json");
const { isDefinitionValid, normalizeDefinition } = require("../content");
const { isCid } = require("../../utils/isCid");
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
  let json;
  if (await isCid(data)) {
    json = await fetchJson(data);
  }

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
