const {
    identity: {
        getIdentityTimelineCollection
    }
} = require("@statescan/mongo");
const {getCurrentBlockTimestamp} = require("../../utils/unitConversion");
const {
    JUDGEMENT_GIVEN,
    JUDGEMENT_REQUESTED,
    JUDGEMENT_UNREQUESTED,
    SUB_IDENTITY_ADDED,
    SUB_IDENTITY_REMOVED,
    SUB_IDENTITY_REVOKED,
} = require('./constants');


async function setIdentityEventForTimeline(method, event, indexer) {
    let identityEvent = {};
    const eventData = event.data;
    identityEvent.accountId = eventData[0].toString();
    //check if judgement or subidentity related method then add extra data
    identityEvent = checkIfJudgementRelated(method, eventData, identityEvent);
    identityEvent = checkIfSubIdentityRelated(method, eventData, identityEvent);
    identityEvent.identityStatus = method;
    identityEvent.timestamp = await getCurrentBlockTimestamp(indexer)
    console.log(`identityEventForTimeline: ${JSON.stringify(identityEvent)}`);
    await addIdentityTimelineCollection(identityEvent, indexer);
}

async function addIdentityTimelineCollection(identityEvent, indexer) {
    const collection = await getIdentityTimelineCollection();
    await collection.insertOne({
        ...identityEvent,
        indexer
    });

}

function checkIfJudgementRelated(method, eventData, identityEvent) {
    if (method === JUDGEMENT_GIVEN || method === JUDGEMENT_UNREQUESTED || method === JUDGEMENT_REQUESTED) {
        identityEvent.registrarIndex = eventData[1].toNumber();
        identityEvent.judgementStatus = method;
    }
    return identityEvent;
}

function checkIfSubIdentityRelated(method, eventData, identityEvent) {

    if (method === SUB_IDENTITY_ADDED || method === SUB_IDENTITY_REMOVED || method === SUB_IDENTITY_REVOKED) {
        identityEvent.subIdentityAccountId = eventData[0].toString();
        identityEvent.accountId = eventData[1].toString();
        identityEvent.subIdentityStatus = method;
    }
    return identityEvent;

}

module.exports = {
    setIdentityEventForTimeline
}
