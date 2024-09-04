import extractEvent from "../extractEventInfo";

export default function extractEvents(allBlockEvents, blockIndexer) {
  return (allBlockEvents || []).map((event, eventIndex) =>
    extractEvent(event, { ...blockIndexer, eventIndex }),
  );
}
