import extractEvent from "../extractEventInfo";

export default function extractEvents(events, blockIndexer) {
  return (events || []).map((event, eventIndex) =>
    extractEvent(event, { ...blockIndexer, eventIndex }),
  );
}
