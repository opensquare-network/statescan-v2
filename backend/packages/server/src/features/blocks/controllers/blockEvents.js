const { getBlockItems } = require("./blockItems");
const {
  block: { getEventCollection },
} = require("@statescan/mongo");

async function getBlockEvents(ctx) {
  ctx.body = await getBlockItems(
    await getEventCollection(),
    ctx,
    "indexer.eventIndex",
  );
}

module.exports = {
  getBlockEvents,
};
