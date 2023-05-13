const {
  chain: { getApi },
} = require("@osn/scan-common");
const {setIdentity} = require("./identityOperations");

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

    if("IdentitySet" === method) {
      console.log(`AccountId: ${event.data[0].toString()}, Balance: ${event.data[1].toString()}`);

    }else if("IdentityCleared" === method) {
      console.log(`AccountId: ${event.data[0].toString()}, Balance: ${event.data[1].toString()}`);

    } else if("IdentityKilled" === method) {
      console.log(`AccountId: ${event.data[0].toString()}, Balance: ${event.data[1].toString()}`);

    } else if("JudgementGiven" === method) {
      console.log(`AccountId: ${event.data[0].toString()}, RegistrarIndex: ${event.data[1].toString()}`);

    } else if("JudgementRequested" === method) {
      console.log(`AccountId: ${event.data[0].toString()}, RegistrarIndex: ${event.data[1].toString()}`);

    } else if("JudgementUnrequested" === method) {
      console.log(`AccountId: ${event.data[0].toString()}, RegistrarIndex: ${event.data[1].toString()}`);

    } else if("RegistrarAdded" === method) {
      console.log(`RegistrarIndex: ${event.data[0].toString()}`);

    } else if("SubIdentityAdded" === method) {
      console.log(`Main AccountId: ${event.data[0].toString()}, Sub-identity AccountId: ${event.data[1].toString()}, Balance: ${event.data[2].toString()}`);

    } else if("SubIdentityRemoved" === method) {
      console.log(`Main AccountId: ${event.data[0].toString()}, Sub-identity AccountId: ${event.data[1].toString()}, Balance: ${event.data[2].toString()}`);

    } else if("SubIdentityRevoked" === method) {
      console.log(`Main AccountId: ${event.data[0].toString()}, Sub-identity AccountId: ${event.data[1].toString()}, Balance: ${event.data[2].toString()}`);

    }

    return;
  }
  console.log(`Event type: ${event.section}.${event.method}`);
  let senderAccountId = null;
  if(extrinsic.isSigned){
    senderAccountId = extrinsic.signer.toString();
  }

  //TODO: handle all identity events

  // todo: handle various identity events, extract business data and save it to DB







  // todo: handle batch completed event via extrinsic with api.query.system.events.at(blockHash) and filter phase.isApplyExtrinsic
}

module.exports = {
  handleIdentityEvents,
};
