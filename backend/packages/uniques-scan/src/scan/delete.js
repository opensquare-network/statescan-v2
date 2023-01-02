const {
  uniques: { getClassCol, getClassTimelineCol },
} = require("@statescan/mongo");

async function deleteFrom(height) {
  if (!height) {
    throw new Error("No height given when deleting unFinalized transfers");
  }

  const col = await getClassCol();
  await col.deleteMany({ classHeight: { $gte: height } });

  const timelineCol = await getClassTimelineCol();
  await timelineCol.deleteMany({ "indexer.blockHeight": { $gte: height } });
}

module.exports = {
  deleteFrom,
};
