const {
    identity: {
        getRegistrarsTimelineCollection
    }
} = require("@statescan/mongo");
const {
    currentBlockTimestamp
} = require("../../utils/timeStampConversion");

async function setRegistrarJudgement(method, event, indexer) {
    let registrarJudgement = {};
    const eventData = event.data;
    registrarJudgement.requestingAccountId = eventData[0].toString();
    registrarJudgement.registrarIndex = eventData[1].toNumber();
    registrarJudgement.judgementStatus = method;
    registrarJudgement.requestedTimestamp = currentBlockTimestamp(indexer)
    console.log(`registrarJudgement: ${JSON.stringify(registrarJudgement)}`);
    await addRegistrarsTimelineCollection(registrarJudgement);
}

async function addRegistrarsTimelineCollection(object) {
    const collection = await getRegistrarsTimelineCollection();
    await collection.insertOne(object);
}


module.exports = {
    setRegistrarJudgement
}
