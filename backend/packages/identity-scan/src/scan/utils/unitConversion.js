const { hexToU8a, u8aToString } = require("@polkadot/util");
const { getApiConditionally } = require("../common");

/**
 * Get the display name of the sub identity of the given account and convert it to utf8.
 *
 * @param accountId
 * @returns {Promise<*|null>}
 */
async function getSubIdentityDisplay(accountId) {
  const api = await getApiConditionally();
  const subIdentityStorage = await api.query.identity.superOf(accountId);
  if (subIdentityStorage.isSome) {
    const [, raw] = subIdentityStorage.unwrap();
    return raw.asRaw.toUtf8();
  }
  return null;
}

/**
 *  converts hex to UTF-8 string
 *
 * @param hex
 * @returns {string}
 */
function hexToString(hex) {
  const u8a = hexToU8a(hex);
  const subDisplay = u8aToString(u8a);
  return subDisplay;
}

module.exports = {
  getSubIdentityDisplay,
  hexToString,
};
