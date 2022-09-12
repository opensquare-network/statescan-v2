function checkIsExtrinsicResult(section, method) {
  return "system" === section && ["ExtrinsicSuccess", "ExtrinsicFailed"].includes(method);
}

function normalizeEvent(wrappedEvent, blockIndexer, eventIndex) {
  const { event, phase } = wrappedEvent;
  const isExtrinsic = phase.isApplyExtrinsic;

  let indexer = {
    ...blockIndexer,
    eventIndex
  }

  const { section, method } = event;
  if (isExtrinsic) {
    const extrinsicIndex = phase.value.toNumber();
    indexer = { ...indexer, extrinsicIndex };
  }
  const isExtrinsicResult = checkIsExtrinsicResult(section, method);

  const args = [];
  let dataIndex = 0;
  for (const item of event.data) {
    const name = event.meta.fields[dataIndex].name.toString();
    const typeName = event.meta.fields[dataIndex].typeName.toString();
    const docs = event.meta.docs.map((d) => d.toString());

    args.push({
      docs,
      name,
      typeName,
      value: item.toJSON(),
    });

    dataIndex++;
  }

  return {
    indexer,
    isExtrinsic,
    isExtrinsicResult,
    section,
    method,
    args,
  }
}

function normalizeEvents(events = [], blockIndexer) {
  let index = 0;
  let normalizedEvents = [];
  for (const event of events) {
    const normalizedEvent = normalizeEvent(event, blockIndexer, index);
    normalizedEvents.push(normalizedEvent);
    index++;
  }

  return normalizedEvents;
}

module.exports = {
  normalizeEvents,
}
