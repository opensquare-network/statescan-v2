const {
    identity: {
        getRegistrarsTimelineCollection
    }
} = require("@statescan/mongo");
const {
    chain: { getApi },
} = require("@osn/scan-common");

async function setRegistrarJudgement(method, event, extrinsic) {

    let registrarJudgement = {};
    const eventData = event.data;
    registrarJudgement.requestingAccountId = eventData[0].toString();
    registrarJudgement.registrarIndex = eventData[1].toNumber();
    registrarJudgement.judgementStatus = method;
    registrarJudgement.requestTimestamp = getApi().query.timestamp.now.at(extrinsic.blockHash);
    console.log(`registrarJudgement: ${JSON.stringify(registrarJudgement)}`);
    await addRegistrarsTimelineCollection(registrarJudgement);
}


//TODO: fix pk and add index in DB
async function addRegistrarsTimelineCollection(object) {
    const collection = await getRegistrarsTimelineCollection();
    await collection.insertOne(object);
}


module.exports = {
    setRegistrarJudgement
}
