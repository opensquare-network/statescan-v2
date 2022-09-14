const {
  block: { getEventCollection, getUnFinalizedEventCollection }
} = require("@statescan/mongo");

async function findEvent(col, q, isFinalized = true) {
  const event = await col.findOne(q, { projection: { _id: 0 } });
  return event ? { ...event, isFinalized } : event;
}

async function getEvent(ctx) {
  const { blockHeight, eventIndex } = ctx.params;

  const q = {
    "indexer.blockHeight": Number(blockHeight),
    "indexer.eventIndex": Number(eventIndex),
  };

  let event = await findEvent(await getEventCollection(), q);
  if (!event) {
    event = await findEvent(await getUnFinalizedEventCollection(), q, false);
  }
  ctx.body = event;
}

module.exports = {
  getEvent,
}
