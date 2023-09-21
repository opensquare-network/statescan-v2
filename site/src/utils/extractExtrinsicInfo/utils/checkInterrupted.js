import { UtilityEvents } from "../consts";

function findInterrupted(wrappedEvents) {
  return (wrappedEvents?.events || []).find(
    ({ event }) => event?.method === UtilityEvents.BatchInterrupted,
  );
}

export { findInterrupted };
