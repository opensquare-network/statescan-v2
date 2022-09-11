const {
  block: {
    getUnFinalizedEventCollection,
    getUnFinalizedCallCollection,
    getUnFinalizedExtrinsicCollection,
    getUnFinalizedBlockCollection,
  }
} = require("@statescan/mongo");

async function deleteUnFinalizedLte(height) {
  const blockCol = await getUnFinalizedBlockCollection();
  await blockCol.deleteMany({ height: { $lte: height } });

  const eventCol = await getUnFinalizedEventCollection();
  await eventCol.deleteMany({ 'indexer.blockHeight': { lte: height } });

  const extrinsicCol = await getUnFinalizedExtrinsicCollection();
  await extrinsicCol.deleteMany({ 'indexer.blockHeight': { lte: height } });

  const callCol = await getUnFinalizedCallCollection();
  await callCol.deleteMany({ 'indexer.blockHeight': { lte: height } });
}

module.exports = {
  deleteUnFinalizedLte,
}
