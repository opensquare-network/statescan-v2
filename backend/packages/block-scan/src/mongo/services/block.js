const {
  block: { getBlockCollection },
} = require("@statescan/mongo");

async function upsertBlock(block) {
  const col = await getBlockCollection();
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

async function insertBlock(block) {
  const col = await getBlockCollection();
  await col.insertOne(block);
}

module.exports = {
  upsertBlock,
  insertBlock,
};
