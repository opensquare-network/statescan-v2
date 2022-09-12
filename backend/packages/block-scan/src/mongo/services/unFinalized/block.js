const { block: { getUnFinalizedBlockCollection } } = require("@statescan/mongo");

async function upsertUnFinalizedBlock(block) {
  const col = await getUnFinalizedBlockCollection();
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
