const {
    getIdentityStorage
} = require('../../utils/getIdentityStorage');
const {
    identity: {
        getIdentityCol
    }
} = require("@statescan/mongo");

async function updateIdentity(identity) {
    const registrarsCollection = await getIdentityCol();
    await registrarsCollection.updateOne({ _id: identity.accountId }, { $set: identity }, { upsert: true });
}

async function setIdentity(event) {
    const accountId = event.data[0].toString();

    //TODO: execute after current block is finalized for storage not included in current block
    let identityInfo = await getIdentityStorage(accountId);
    console.log(`identityInfo: ${JSON.stringify(identityInfo)}`);
    await updateIdentity(identityInfo);
}

// delete identity
async function deleteIdentity(event) {
    const accountId = event.data[0].toString();
    const registrarsCollection = await getIdentityCol();
    await registrarsCollection.deleteOne({ _id: accountId });
}

module.exports = {
    setIdentity,
    deleteIdentity
}
