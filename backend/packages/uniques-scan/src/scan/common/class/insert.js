const { queryClassDetails } = require("../../query/class/details");
const {
  uniques: { getClassCol },
} = require("@statescan/mongo");

async function insertClassWithDetails(classId, indexer) {
  const details = await queryClassDetails(classId, indexer.blockHash);
  const col = await getClassCol();
  await col.insertOne({
    classId,
    classHeight: indexer.blockHeight,
    indexer,
    details,
    isDestroyed: false,
  });
}

module.exports = {
  insertClassWithDetails,
};
