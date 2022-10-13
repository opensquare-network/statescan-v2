const { getBlockItems } = require("./blockItems");
const {
  block: { getEventCollection, getUnFinalizedEventCollection },
} = require("@statescan/mongo");

async function getBlockEvents(ctx) {
  const finalized = await getBlockItems(
    await getEventCollection(),
    ctx,
    "indexer.eventIndex",
  );
  if (finalized.items.length > 0) {
    ctx.body = finalized;
    return;
  }

  ctx.body = await getBlockItems(
    await getUnFinalizedEventCollection(),
    ctx,
    "indexer.eventIndex",
  );
}

module.exports = {
  getBlockEvents,
};
