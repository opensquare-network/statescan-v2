const { getBlockCollection } = require("../index");

async function upsertBlock(block) {
  const col = await getBlockCollection();
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
  upsertBlock,
}
