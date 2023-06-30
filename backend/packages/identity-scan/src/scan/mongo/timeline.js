const {
  identity: { getIdentityTimelineCol },
} = require("@statescan/mongo");

async function insertIdentityTimeline(obj = {}) {
  const collection = await getIdentityTimelineCol();
  await collection.insertOne(obj);
}

module.exports = {
  insertIdentityTimeline,
};
