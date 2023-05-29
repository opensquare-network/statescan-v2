const {
  identity: { getIdentityTimelineCollection },
} = require("@statescan/mongo");
const {
  getCurrentBlockTimestamp,
  getSubIdentityDisplay,
} = require("../../utils/unitConversion");
const {
  EVENT_METHOD: {
    JUDGEMENT_GIVEN,
    JUDGEMENT_REQUESTED,
    JUDGEMENT_UNREQUESTED,
    SUB_IDENTITY_ADDED,
    SUB_IDENTITY_REMOVED,
    SUB_IDENTITY_REVOKED,
  },
} = require("../../constants");
const { getIdentityStorage } = require("../../utils/getIdentityStorage");

async function setIdentityEventForTimeline(method, event, indexer) {
  let identityEvent = {};
  const eventData = event.data;
  const accountId = eventData[0].toString();

  identityEvent = await getIdentityStorage(accountId);

  //check if judgement or subidentity related method then add extra data
  const judgementRelatedData = checkIfJudgementRelated(
    method,
    eventData,
    identityEvent,
  );
  identityEvent = { ...identityEvent, ...judgementRelatedData };

  const subIdentityRelatedData = await checkIfSubIdentityRelated(
    method,
    eventData,
    identityEvent,
  );
  identityEvent = { ...identityEvent, ...subIdentityRelatedData };

  identityEvent.method = method;
  identityEvent.timestamp = await getCurrentBlockTimestamp(indexer);

  await addIdentityTimelineCollection(identityEvent, indexer);
}

async function addIdentityTimelineCollection(identityEvent, indexer) {
  const collection = await getIdentityTimelineCollection();
  await collection.insertOne({
    ...identityEvent,
    indexer,
  });
}

function checkIfJudgementRelated(method, eventData, identityEvent) {
  if (
    method === JUDGEMENT_GIVEN ||
    method === JUDGEMENT_UNREQUESTED ||
    method === JUDGEMENT_REQUESTED
  ) {
    identityEvent.registrarIndex = eventData[1].toNumber();
  }
  return identityEvent;
}

async function checkIfSubIdentityRelated(method, eventData, identityEvent) {
  if (
    method === SUB_IDENTITY_ADDED ||
    method === SUB_IDENTITY_REMOVED ||
    method === SUB_IDENTITY_REVOKED
  ) {
    const subIdentityAccountId = eventData[0].toString();
    const parentIdentityAccountId = eventData[1].toString();
    identityEvent.subIdentityAccountId = subIdentityAccountId;
    identityEvent.accountId = parentIdentityAccountId;

    // override main identity display with sub identity display below as only sub identity display name is different, rest info is inherited from parent identity
    if (method === SUB_IDENTITY_ADDED) {
      identityEvent = await getIdentityStorage(parentIdentityAccountId);
      identityEvent.info.display = await getSubIdentityDisplay(
        subIdentityAccountId,
      );
    }
  }
  return identityEvent;
}

module.exports = {
  setIdentityEventForTimeline,
};
