const {
  block: {
    getBlockCollection,
    getExtrinsicCollection,
    getEventCollection,
    getCallCollection,
    getTransferCol,
  },
} = require("@statescan/mongo");

async function deleteFrom(height = 0) {
  const blockCol = await getBlockCollection();
  await blockCol.deleteMany({ height: { $gte: height } });

  const extrinsicCol = await getExtrinsicCollection();
  await extrinsicCol.deleteMany({ "indexer.blockHeight": { $gte: height } });

  const eventCol = await getEventCollection();
  await eventCol.deleteMany({ "indexer.blockHeight": { $gte: height } });

  const callCol = await getCallCollection();
  await callCol.deleteMany({ "indexer.blockHeight": { $gte: height } });

  const transferCol = await getTransferCol();
  await transferCol.deleteMany({ "indexer.blockHeight": { $gte: height } });
}

module.exports = {
  deleteFrom,
};
