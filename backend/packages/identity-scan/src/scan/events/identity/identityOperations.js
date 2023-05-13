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

async function setIdentity(event) {
    let accountId = event.data[0].toString();
    let identityInfo = getidentityStorage(accountId);
    await updateIdentity(identityInfo);
}

// delete identity
async function deleteIdentity(event) {
    let accountId = event.data[0].toString();
    const registrarsCollection = await getIdentityCol();
    await registrarsCollection.deleteOne({ index: accountId });
}

module.exports = {
    setIdentity,
    deleteIdentity
}
