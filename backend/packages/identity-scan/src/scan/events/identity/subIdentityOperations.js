const {
    identity: {
        getSubIdentitiesCol
    }
} = require("@statescan/mongo");
const {
    getidentityStorage
} = require("../../utils/getidentityStorage");
const {
    currentBlockTimestamp
} = require("../../utils/timeStampConversion");

async function addSubIdentitiesCollection(subIdentity) {
    const collection = await getSubIdentitiesCol();
    //update and upsert collection
    await collection.updateOne(
        { _id: subIdentity.accountId },
        { $set: subIdentity },
        { upsert: true }
    );
}

async function setSubIdentity(method, event, indexer) {
        let subIdentity = {};
        let subIdentityAccountId = event.data[0].toString();

        //TODO: execute after current block is finalized
        subIdentity = await getidentityStorage(subIdentityAccountId);
        subIdentity.subIdentityAccountId = subIdentityAccountId;
        subIdentity.mainIdentityAccountId = event.data[1].toString();
        subIdentity.subIdentityStatus = method;
        subIdentity.requestTimestamp = await currentBlockTimestamp(indexer)
        console.log(`subIdentity: ${JSON.stringify(subIdentity)}`);
        await addSubIdentitiesCollection(subIdentity);
}

// delete sub identity
async function deleteSubIdentity(event) {
    let accountId = event.data[0].toString();
    const registrarsCollection = await getSubIdentitiesCol();
    await registrarsCollection.deleteOne({ index: accountId });
}

module.exports = {
    setSubIdentity,
    deleteSubIdentity
}
