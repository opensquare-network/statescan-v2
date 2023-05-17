const {
    identity: {
        getRegistrarsTimelineCollection
    }
} = require("@statescan/mongo");
const {
    getCurrentBlockTimestamp
} = require("../../utils/unitConversion");

async function setRegistrarJudgement(method, event, indexer) {
    let registrarJudgement = {};
    const eventData = event.data;
    registrarJudgement.requestingAccountId = eventData[0].toString();
    registrarJudgement.registrarIndex = eventData[1].toNumber();
    registrarJudgement.judgementStatus = method;

    registrarJudgement.requestedTimestamp = await getCurrentBlockTimestamp(indexer)
    console.log(`registrarJudgement: ${JSON.stringify(registrarJudgement)}`);

    await addRegistrarsTimelineCollection(registrarJudgement,indexer);
}

async function addRegistrarsTimelineCollection(object,indexer) {
    const collection = await getRegistrarsTimelineCollection();
    await collection.insertOne({
        ...object,
        indexer
    });
}


module.exports = {
    setRegistrarJudgement
}
