const {
  handleIdentityCleared,
  handleIdentitySet,
  handleIdentityKilled,
  handleJudgementRequested,
  handleJudgementUnrequested,
  handleSubIdentityAdded,
  handleSubIdentityRemoved,
  handleSubIdentityRevoked,
  handleRegistrarAdded,
  handleJudgementGiven,
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
    RegistrarAdded,
  },
} = require("../../constants");
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
    await handleJudgementGiven(event, indexer, extrinsic);
  } else if (JUDGEMENT_REQUESTED === method) {
    await handleJudgementRequested(event, indexer, extrinsic);
  } else if (JUDGEMENT_UNREQUESTED === method) {
    await handleJudgementUnrequested(event, indexer);
  } else if (SUB_IDENTITY_ADDED === method) {
    await handleSubIdentityAdded(event, indexer);
  } else if (SUB_IDENTITY_REMOVED === method) {
    await handleSubIdentityRemoved(event, indexer);
  } else if (SUB_IDENTITY_REVOKED === method) {
    await handleSubIdentityRevoked(event, indexer);
  } else if (RegistrarAdded === method) {
    await handleRegistrarAdded(event, indexer);
  }
}

module.exports = {
  handleIdentityEvents,
};
