const { BN } = require("@polkadot/util");
const {
  chain: { getApi },
} = require("@osn/scan-common");
const { hexToU8a, u8aToString } = require("@polkadot/util");

/**
 * Get the current block timestamp of the given indexer.
 *
 * @param indexer
 * @returns {Promise<Date>}
 */
async function getCurrentBlockTimestamp(indexer) {
  const api = await getApi();
  const currentBlockTimestamp = await api.query.timestamp.now.at(
    indexer.blockHash,
  );
  return new Date(currentBlockTimestamp.toNumber());
}

/**
 * Get the display name of the sub identity of the given account and convert it to utf8.
 *
 * @param accountId
 * @returns {Promise<*|null>}
 */
async function getSubIdentityDisplay(accountId) {
  const api = await getApi();
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
  getCurrentBlockTimestamp,
  getSubIdentityDisplay,
  hexToString,
};
