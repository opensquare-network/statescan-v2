const { handleJudgementRequested } = require("./events");
const {
  handleIdentityCleared,
  handleIdentitySet,
  handleIdentityKilled,
} = require("./events");
const { setRegistrarJudgement } = require("./registrarOperations");

const {
  SECTION: { IDENTITY },
  EVENT_METHOD: {
    IDENTITY_SET,
    IDENTITY_CLEARED,
    IDENTITY_KILLED,
    JUDGEMENT_GIVEN,
    JUDGEMENT_REQUESTED,
    JUDGEMENT_UNREQUESTED,
    SUB_IDENTITY_ADDED,
    SUB_IDENTITY_REMOVED,
    SUB_IDENTITY_REVOKED,
  },
} = require("../../constants");
const {
  setSubIdentity,
  deleteSubIdentity,
} = require("./subIdentityOperations");
const { setIdentityEventForTimeline } = require("./identityTimelineOperations");

/**
 * Handle identity events and save to DB
 *
 * @param event
 * @param indexer
 * @param extrinsic
 * @returns {Promise<void>}
 */
async function handleIdentityEvents(event, indexer, extrinsic) {
  const { section, method } = event;

  if (IDENTITY !== section) {
    return;
  }

  if (IDENTITY_SET === method) {
    await handleIdentitySet(event, indexer);
  } else if (IDENTITY_CLEARED === method) {
    await handleIdentityCleared(event, indexer);
  } else if (IDENTITY_KILLED === method) {
    await handleIdentityKilled(event, indexer);
  } else if (JUDGEMENT_GIVEN === method) {
    await setRegistrarJudgement(JUDGEMENT_GIVEN, event, indexer);
    await setIdentityEventForTimeline(JUDGEMENT_GIVEN, event, indexer);
  } else if (JUDGEMENT_REQUESTED === method) {
    await handleJudgementRequested(event, indexer);
    // await setRegistrarJudgement(JUDGEMENT_REQUESTED, event, indexer);
    // await setIdentityEventForTimeline(JUDGEMENT_REQUESTED, event, indexer);
  } else if (JUDGEMENT_UNREQUESTED === method) {
    await setRegistrarJudgement(JUDGEMENT_UNREQUESTED, event, indexer);
    await setIdentityEventForTimeline(JUDGEMENT_UNREQUESTED, event, indexer);
  } else if (SUB_IDENTITY_ADDED === method) {
    await setSubIdentity(SUB_IDENTITY_ADDED, event, indexer);
    await setIdentityEventForTimeline(SUB_IDENTITY_ADDED, event, indexer);
  } else if (SUB_IDENTITY_REMOVED === method) {
    await deleteSubIdentity(event);
    await setIdentityEventForTimeline(SUB_IDENTITY_REMOVED, event, indexer);
  } else if (SUB_IDENTITY_REVOKED === method) {
    await deleteSubIdentity(event);
    await setIdentityEventForTimeline(SUB_IDENTITY_REVOKED, event, indexer);
  }
}

module.exports = {
  handleIdentityEvents,
};
