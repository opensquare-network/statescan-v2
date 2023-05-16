const {
    identity: {
        getSubIdentitiesCol
    }
} = require("@statescan/mongo");
const {
    getIdentityStorage
} = require("../../utils/getIdentityStorage");
const {
    getCurrentBlockTimestamp,
    getSubIdentityDisplay
} = require("../../utils/unitConversion");

async function addSubIdentitiesCollection(subIdentity) {
    const collection = await getSubIdentitiesCol();
    //update and upsert collection
    await collection.updateOne(
        {_id: subIdentity.accountId},
        {$set: subIdentity},
        {upsert: true}
    );
}

async function setSubIdentity(method, event, indexer) {
    let subIdentity = {};
    const parentIdentityAccountId = event.data[1].toString();
    const subIdentityAccountId = event.data[0].toString();
    subIdentity = await getIdentityStorage(parentIdentityAccountId);

    // override main identity display with sub identity display below as only sub identity display name is different, rest info is inherited from parent identity
    subIdentity.info.display = await getSubIdentityDisplay(subIdentityAccountId);
    subIdentity.accountId = subIdentityAccountId;
    subIdentity.subIdentityAccountId = subIdentityAccountId;
    subIdentity.parentIdentityAccountId = parentIdentityAccountId;
    subIdentity.subIdentityStatus = method;
    subIdentity.requestTimestamp = await getCurrentBlockTimestamp(indexer)
    console.log(`subIdentity: ${JSON.stringify(subIdentity)}`);
    await addSubIdentitiesCollection(subIdentity);
}

// delete sub identity
async function deleteSubIdentity(event) {
    const subIdentityAccountId = event.data[0].toString();
    const registrarsCollection = await getSubIdentitiesCol();
    await registrarsCollection.deleteOne({_id: subIdentityAccountId});
}

module.exports = {
    setSubIdentity,
    deleteSubIdentity
}
