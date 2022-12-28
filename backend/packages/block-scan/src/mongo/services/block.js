const {
  block: { getBlockCollection },
} = require("@statescan/mongo");

async function insertBlock(block) {
  const col = await getBlockCollection();
  await col.insertOne(block);
}

module.exports = {
  insertBlock,
};
