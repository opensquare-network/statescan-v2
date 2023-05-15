

const {
    chain: { getApi },
} = require("@osn/scan-common");

/**
 * Get the current block timestamp of the given indexer.
 *
 * @param indexer
 * @returns {Promise<Date>}
 */
async function currentBlockTimestamp(indexer) {
    const api = await getApi();
    const currentBlockTimestamp = await api.query.timestamp.now.at(indexer.blockHash);
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


module.exports = {
    currentBlockTimestamp,
    getSubIdentityDisplay
}
