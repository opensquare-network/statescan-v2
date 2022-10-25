const {
  block: {
    getUnFinalizedBlockCollection,
    getUnFinalizedEventCollection,
    getUnFinalizedCallCollection,
    getUnFinalizedExtrinsicCollection,
  },
} = require("@statescan/mongo");

async function deleteAllUnFinalizedData() {
  const blockCol = await getUnFinalizedBlockCollection();
  await blockCol.deleteMany({});

  const extrinsicCol = await getUnFinalizedExtrinsicCollection();
  await extrinsicCol.deleteMany({});

  const eventCol = await getUnFinalizedEventCollection();
  await eventCol.deleteMany({});

  const callCol = await getUnFinalizedCallCollection();
  await callCol.deleteMany({});
}

module.exports = {
  deleteAllUnFinalizedData,
};
