const {
  identity: {
    getRegistrarsTimelineCollection
  }
} = require("@statescan/mongo");

async function deleteFrom(height) {
  // todo: delete business generated from block whose height is >= height
  if (!height) {
    throw new Error("No height given when deleting unFinalized transfers");
  }

  const collection = await getRegistrarsTimelineCollection();
  await collection.deleteMany({ "indexer.blockHeight": { $gte: height } });


}

module.exports = {
  deleteFrom,
};
