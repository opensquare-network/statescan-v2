import { WrappedEvents } from "../type/wrappedEvents";
import { Modules, MultisigEvents } from "../consts";
import { createKeyMulti, encodeAddress } from "@polkadot/util-crypto";

function getMultisigInnerCallEvents(wrappedEvents) {
  const source = wrappedEvents?.events || [];
  const index = source.findIndex(
    ({ event }) => event?.method === MultisigEvents.MultisigExecuted,
  );

  let events = source.slice(0, index);
  if (index < 0) {
    events = source;
  }

  return new WrappedEvents(
    events,
    wrappedEvents.offset,
    index >= 0 ? true : wrappedEvents.wrapped,
  );
}

function isMultisigExecutedOk(events = []) {
  const event = events.find(
    ({ event }) =>
      event.section === Modules.Multisig &&
      MultisigEvents.MultisigExecuted === event.method,
  );

  if (!event) {
    return false;
  }

  return event.event?.data[4].isOk;
}

function calcMultisigAddress(signatories, threshold, chainSS58) {
  const multiPub = createKeyMulti(signatories, threshold);
  return encodeAddress(multiPub, chainSS58);
}

export {
  getMultisigInnerCallEvents,
  isMultisigExecutedOk,
  calcMultisigAddress,
};
