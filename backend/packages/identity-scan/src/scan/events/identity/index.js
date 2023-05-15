const {
    setIdentity,
    deleteIdentity
} = require("./identityOperations");
const {
    setRegistrarJudgement
} = require("./registrarOperations");

const {
    IDENTITY_SET,
    IDENTITY_CLEARED,
    IDENTITY_KILLED,
    JUDGEMENT_GIVEN,
    JUDGEMENT_REQUESTED,
    JUDGEMENT_UNREQUESTED,
    REGISTRAR_ADDED,
    SUB_IDENTITY_ADDED,
    SUB_IDENTITY_REMOVED,
    SUB_IDENTITY_REVOKED
} = require('./constants');
const {
    setSubIdentity,
    deleteSubIdentity
} = require("./subIdentityOperations");

/**
 * Handle identity events and save to DB
 *
 * @param event
 * @param indexer
 * @param extrinsic
 * @param blockEvents
 * @returns {Promise<void>}
 */
async function handleIdentityEvents(
    event,
    indexer,
    extrinsic,
    blockEvents = [],
) {
    const {section, method} = event;
    console.log(`handleIdentityEvents: ${section}.${method}`);
    if ("identity" === section) {

        if (IDENTITY_SET === method) {
            await setIdentity(event)
        } else if (IDENTITY_CLEARED === method) {
            await deleteIdentity(event)
        } else if (IDENTITY_KILLED === method) {
            await deleteIdentity(event)
        } else if (JUDGEMENT_GIVEN === method) {
            await setRegistrarJudgement(JUDGEMENT_GIVEN, event, indexer)
        } else if (JUDGEMENT_REQUESTED === method) {
            await setRegistrarJudgement(JUDGEMENT_REQUESTED, event, indexer)
        } else if (JUDGEMENT_UNREQUESTED === method) {
            await setRegistrarJudgement(JUDGEMENT_UNREQUESTED, event, indexer)
        } else if (REGISTRAR_ADDED === method) {
            console.log(`RegistrarIndex: ${event.data[0].toString()}`);
        } else if (SUB_IDENTITY_ADDED === method) {
            await setSubIdentity(SUB_IDENTITY_ADDED, event, indexer);
        } else if (SUB_IDENTITY_REMOVED === method) {
            await deleteSubIdentity(event)
        } else if (SUB_IDENTITY_REVOKED === method) {
            await deleteSubIdentity(event)
        }
    }


    // todo: handle batch completed event via extrinsic with api.query.system.events.at(blockHash) and filter phase.isApplyExtrinsic
}

module.exports = {
    handleIdentityEvents,
};
