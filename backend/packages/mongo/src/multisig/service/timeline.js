const { getTimelineCol } = require("../db");

async function insertMultisigTimelineItem(obj = {}) {
  const col = await getTimelineCol();
  await col.insertOne(obj);
}

module.exports = {
  insertMultisigTimelineItem,
};
