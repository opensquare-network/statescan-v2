const {
  chain: { getApi },
} = require("@osn/scan-common");
const {setIdentity} = require("./identityOperations");
const {setRegisrarJudgement} = require("./registrarOperations");

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
  const { section, method } = event;
  const api = getApi();
  if ("identity" === section) {
    console.log(`handleIdentityEv nents: ${section}.${method}`);
    console.log(`Event type: ${event.section}.${event.method}`);
    let senderAccountId = extrinsic.signer.toString();
    if(IDENTITY_SET === method) {
      await setIdentity(senderAccountId, event, extrinsic)
      console.log(`AccountId: ${event.data[0].toString()}, Balance: ${event.data[1].toString()}`);

    }else if(IDENTITY_CLEARED === method) {
      console.log(`AccountId: ${event.data[0].toString()}, Balance: ${event.data[1].toString()}`);

    } else if(IDENTITY_KILLED === method) {
      console.log(`AccountId: ${event.data[0].toString()}, Balance: ${event.data[1].toString()}`);

    } else if(JUDGEMENT_GIVEN === method) {
      setRegisrarJudgement(JUDGEMENT_GIVEN, event, extrinsic)
      console.log(`AccountId: ${event.data[0].toString()}, RegistrarIndex: ${event.data[1].toString()}`);

    } else if(JUDGEMENT_REQUESTED === method) {
      setRegisrarJudgement(JUDGEMENT_REQUESTED, event, extrinsic)
      console.log(`AccountId: ${event.data[0].toString()}, RegistrarIndex: ${event.data[1].toString()}`);

    } else if(JUDGEMENT_UNREQUESTED === method) {
      setRegisrarJudgement(JUDGEMENT_UNREQUESTED, event, extrinsic)
      console.log(`AccountId: ${event.data[0].toString()}, RegistrarIndex: ${event.data[1].toString()}`);

    } else if(REGISTRAR_ADDED === method) {
      console.log(`RegistrarIndex: ${event.data[0].toString()}`);

    } else if(SUB_IDENTITY_ADDED === method) {
      console.log(`Main AccountId: ${event.data[0].toString()}, Sub-identity AccountId: ${event.data[1].toString()}, Balance: ${event.data[2].toString()}`);

    } else if(SUB_IDENTITY_REMOVED === method) {
      console.log(`Main AccountId: ${event.data[0].toString()}, Sub-identity AccountId: ${event.data[1].toString()}, Balance: ${event.data[2].toString()}`);

    } else if(SUB_IDENTITY_REVOKED === method) {
      console.log(`Main AccountId: ${event.data[0].toString()}, Sub-identity AccountId: ${event.data[1].toString()}, Balance: ${event.data[2].toString()}`);

    }

    return;
  }


  //TODO: handle all identity events

  // todo: handle various identity events, extract business data and save it to DB







  // todo: handle batch completed event via extrinsic with api.query.system.events.at(blockHash) and filter phase.isApplyExtrinsic
}

module.exports = {
  handleIdentityEvents,
};
