const { BN } = require('@polkadot/util');
const {
    chain: { getApi },
} = require("@osn/scan-common");

/**
 * Get the current block timestamp of the given indexer.
 *
 * @param indexer
 * @returns {Promise<Date>}
 */
async function getCurrentBlockTimestamp(indexer) {
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

/**
 * convert planck unit to decimal with token name(WND,DOT,KSM) e.g. / 1000000000000 to 1.0000 WND
 *
 * @param balance
 * @returns {Promise<string>}
 */
async function toDecimal(balance) {
    const api = await getApi();
    const decimals = api.registry.chainDecimals[0];
    const base = new BN(10).pow(new BN(decimals));
    const dm = new BN(balance).divmod(base);
    return parseFloat(dm.div.toString() + "." + dm.mod.toString()) + " " + api.registry.chainTokens[0];
}

module.exports = {
    getCurrentBlockTimestamp,
    getSubIdentityDisplay,
    toDecimal
}
