const {
  block: { getEventCollection },
} = require("@statescan/mongo");

const MAX_PAGE_SIZE = 100;

async function chainEvents(_, _args) {
  const { section, method, offset, limit } = _args;

  if (limit > MAX_PAGE_SIZE) {
    throw new Error(`Over max page size ${MAX_PAGE_SIZE}`);
  }
  if (offset < 0 || limit <= 0) {
    throw new Error(`Invalid offset ${offset} or limit ${limit}`);
  }

  // method is optional, so a section can be listed as a whole.
  const q = { section };
  if (method) {
    Object.assign(q, { method });
  }

  const col = await getEventCollection();
  const events = await col
    .find(q, { projection: { _id: 0 } })
    // Same order as the /events api, and the one the event collection is indexed by, so a
    // page can be served straight from the index.
    .sort({ "indexer.blockHeight": -1, "indexer.eventIndex": 1 })
    .skip(offset)
    .limit(limit)
    .toArray();
  const total = await col.countDocuments(q);

  return {
    events,
    offset,
    limit,
    total,
  };
}

module.exports = {
  chainEvents,
};
