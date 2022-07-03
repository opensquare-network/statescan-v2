const { getEventCollection } = require("../index");

async function batchUpsertEvents(events = []) {
  if (events.length <= 0) {
    return
  }

  const col = await getEventCollection();
  const bulk = col.initializeUnorderedBulkOp();
  for (const event of events) {
    const { indexer } = event;
    bulk.find({
      'indexer.blockHeight': indexer.blockHeight,
      'indexer.eventIndex': indexer.eventIndex,
    }).upsert().update({
      $set: {
        ...event
      }
    })
  }

  await bulk.execute();
}

module.exports = {
  batchUpsertEvents,
}
