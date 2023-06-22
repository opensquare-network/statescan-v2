const {
  identity: { getRegistrarsTimelineCol, getIdentityTimelineCol },
} = require("@statescan/mongo");

async function deleteFrom(height) {
  // todo: delete business generated from block whose height is >= height
  if (!height) {
    throw new Error("No height given when deleting unFinalized transfers");
  }

  const collection = await getRegistrarsTimelineCol();
  await collection.deleteMany({ "indexer.blockHeight": { $gte: height } });

  const identityTimelineCollection = await getIdentityTimelineCol();
  await identityTimelineCollection.deleteMany({
    "indexer.blockHeight": { $gte: height },
  });
}

module.exports = {
  deleteFrom,
};
