const {
  block: { getEventCollection },
} = require("@statescan/mongo");

async function batchInsertEvents(events = []) {
  if (events.length <= 0) {
    return;
  }

  const col = await getEventCollection();
  const bulk = col.initializeUnorderedBulkOp();
  for (const event of events) {
    bulk.insert(event);
  }
  await bulk.execute();
}

module.exports = {
  batchInsertEvents,
};
