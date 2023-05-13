const {
    getidentityStorage
} = require('../../utils/getidentityStorage');
const {
    getIdentityCol
} = require("@statescan/mongo");


async function updateIdentity(identity) {
    const registrarsCollection = await getIdentityCol();
    await registrarsCollection.updateOne({ index: identity.accountId }, { $set: identity }, { upsert: true });
}

async function bulkUpdateIdentities(identities) {
    const identityCollection = await getIdentityCol();

    // Create an array of updateOne operations
    const operations = identities.map((identity) => ({
        updateOne: {
            filter: { index: identity.accountId },
            update: { $set: identity },
            upsert: true
        }
    }));

    // Perform the batch update
    await identityCollection.bulkWrite(operations);
}


async function setIdentity(accountId, event, extrinsic) {
    let identityInfo = getidentityStorage(accountId);
    await updateIdentity(identityInfo);
}

module.exports = {
    setIdentity
}
