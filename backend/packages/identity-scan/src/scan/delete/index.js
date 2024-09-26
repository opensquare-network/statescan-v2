const {
  identity: {
    getRegistrarsTimelineCol,
    getIdentityTimelineCol,
    getRequestCol,
    getRequestTimelineCol,
  },
} = require("@statescan/mongo");

async function deleteFrom(height, chain) {
  if (!height) {
    throw new Error("No height given when deleting unFinalized transfers");
  }

  const commonQ = { "indexer.blockHeight": { $gte: height } };
  if (chain) {
    Object.assign(commonQ, { chain });
  }

  const col = await getRegistrarsTimelineCol();
  await col.deleteMany(commonQ);

  const identityTimelineCollection = await getIdentityTimelineCol();
  await identityTimelineCollection.deleteMany(commonQ);

  const requestCol = await getRequestCol();
  await requestCol.deleteMany(commonQ);
  const requestTimelineCol = await getRequestTimelineCol();
  await requestTimelineCol.deleteMany(commonQ);
}

module.exports = {
  deleteFrom,
};
