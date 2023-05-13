const {
    identity: {
        getSubIdentitiesCol
    }
} = require("@statescan/mongo");
const {
    chain: { getApi },
} = require("@osn/scan-common");
const {
    getidentityStorage
} = require("../../utils/getidentityStorage");

async function addSubIdentitiesCollection(subIdentity) {
    const collection = await getSubIdentitiesCol();
    //update and upsert collection
    await collection.updateOne(
        { index: subIdentity.accountId },
        { $set: subIdentity },
        { upsert: true }
    );
}

async function setSubIdentity(method, event, extrinsic) {
        let subIdentity = {};
        const eventData = event.data;
        let subIdentityAccountId = eventData[0].toString();
        subIdentity = getidentityStorage(subIdentityAccountId);
        subIdentity.subIdentityAccountId = subIdentityAccountId;
        subIdentity.mainIdentityAccountId = eventData[1].toString();
        subIdentity.subIdentityStatus = method;
        subIdentity.requestTimestamp = getApi().query.timestamp.now.at(extrinsic.blockHash);
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
