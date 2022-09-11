const { block: { getUnFinalizedEventCollection } } = require("@statescan/mongo");

async function upsertUnFinalizedBlock(block) {
  const col = await getUnFinalizedEventCollection();
  await col.updateOne(
    { height: block.height },
    {
      $set: {
        ...block,
      }
    },
    { upsert: true }
  );
}

module.exports = {
  upsertUnFinalizedBlock,
}
