const {
  block: { getUnFinalizedBlockCollection },
} = require("@statescan/mongo");

async function upsertUnFinalizedBlock(block) {
  const col = await getUnFinalizedBlockCollection();
  await col.updateOne(
    { height: block.height },
    {
      $set: {
        ...block,
      },
    },
    { upsert: true },
  );
}

async function getLatestUnFinalizedHeightInDb() {
  const col = await getUnFinalizedBlockCollection();
  const [block] = await col.find({}).sort({ height: -1 }).limit(1).toArray();
  return block?.height || null;
}

module.exports = {
  upsertUnFinalizedBlock,
  getLatestUnFinalizedHeightInDb,
};
