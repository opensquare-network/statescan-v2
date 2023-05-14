const {
    identity: {
        getRegistrarsTimelineCollection
    }
} = require("@statescan/mongo");
const {
    chain: { getApi },
} = require("@osn/scan-common");

async function setRegistrarJudgement(method, event, indexer) {
    const api = await getApi();
    let registrarJudgement = {};
    const eventData = event.data;
    registrarJudgement.requestingAccountId = eventData[0].toString();
    registrarJudgement.registrarIndex = eventData[1].toNumber();
    registrarJudgement.judgementStatus = method;
    const currentBlockTimestamp = await api.query.timestamp.now.at(indexer.blockHash);
    registrarJudgement.requestedTimestamp = new Date(currentBlockTimestamp.toNumber());
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
