const {
  block: { getEventCollection }
} = require("@statescan/mongo");

async function getEvent(ctx) {
  const { blockHeight, eventIndex } = ctx.params;
  const col = await getEventCollection();
  ctx.body = await col.findOne({
    "indexer.blockHeight": Number(blockHeight),
    "indexer.eventIndex": Number(eventIndex),
  }, { projection: { _id: 0 } });
}

module.exports = {
  getEvent,
}
