

const {
    chain: { getApi },
} = require("@osn/scan-common");

async function currentBlockTimestamp(indexer) {
    const api = await getApi();
    const currentBlockTimestamp = await api.query.timestamp.now.at(indexer.blockHash);
    return new Date(currentBlockTimestamp.toNumber());
}


module.exports = {
    currentBlockTimestamp
}
