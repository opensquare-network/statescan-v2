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

async function setIdentity(accountId, event, extrinsic) {
    let identityInfo = getidentityStorage(accountId);
    await updateIdentity(identityInfo);
}

module.exports = {
    setIdentity
}
