import extractEvents from "../extractBlockInfo/extractEvents";
import { extractCallsFromExtrinsic } from "./extractCallsFromExtrinsic";
import { normalizeExtrinsic } from "./normalizeExtrinsic";

export default async function extractExtrinsicInfo(
  api,
  extrinsicData,
  blockIndexer,
) {
  const { extrinsic, events, indexer } = extrinsicData;
  const calls = await extractCallsFromExtrinsic(
    api,
    extrinsic,
    events,
    indexer,
  );
  const extrinsicInfo = normalizeExtrinsic(extrinsic, events, indexer);
  const eventInfos = extractEvents(events, indexer);
  return {
    ...extrinsicInfo,
    calls,
    callsCount: calls.length,
    events: eventInfos,
    eventsCount: eventInfos.length,
  };
}
