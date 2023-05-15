const {
    identity: {
        getSubIdentitiesCol
    }
} = require("@statescan/mongo");
const {
    getidentityStorage
} = require("../../utils/getidentityStorage");
const {
    currentBlockTimestamp, getSubIdentityDisplay
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
    const mainIdentityAccountId = event.data[1].toString();
    const subIdentityAccountId = event.data[0].toString();
    subIdentity = await getidentityStorage(mainIdentityAccountId);

    // override main identity display with sub identity display below
    subIdentity.info.display = await getSubIdentityDisplay(subIdentityAccountId);
    subIdentity.accountId = subIdentityAccountId;
    subIdentity.subIdentityAccountId = subIdentityAccountId;
    subIdentity.mainIdentityAccountId = mainIdentityAccountId;
    subIdentity.subIdentityStatus = method;
    subIdentity.requestTimestamp = await currentBlockTimestamp(indexer)
    console.log(`subIdentity: ${JSON.stringify(subIdentity)}`);
    await addSubIdentitiesCollection(subIdentity);
}

// delete sub identity
async function deleteSubIdentity(event) {
    let accountId = event.data[0].toString();
    const registrarsCollection = await getSubIdentitiesCol();
    await registrarsCollection.deleteOne({index: accountId});
}

module.exports = {
    setSubIdentity,
    deleteSubIdentity
}
