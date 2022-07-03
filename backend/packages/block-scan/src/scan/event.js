function normalizeEvent(wrappedEvent, blockIndexer, eventIndex) {
  const { event, phase } = wrappedEvent;

  const { section, method } = event;
  const extrinsicIndex = phase.value.toNumber();

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

  const indexer = {
    ...blockIndexer,
    extrinsicIndex,
    eventIndex,
  }

  return {
    indexer,
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
