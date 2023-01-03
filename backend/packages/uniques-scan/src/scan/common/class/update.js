const {
  uniques: { getClassCol },
} = require("@statescan/mongo");
const isEmpty = require("lodash.isempty");
const { queryClassMetadata } = require("../../query/class/metadata");

async function updateClassMetadata(classId, indexer) {
  const metadata = await queryClassMetadata(classId, indexer.blockHash);
  await updateClass(classId, { metadata: metadata || null });
}

async function updateClass(classId, updates = {}) {
  if (isEmpty(updates)) {
    return;
  }

  const classCol = await getClassCol();
  await classCol.updateOne({ classId, isDestroyed: false }, { $set: updates });
}

module.exports = {
  updateClass,
  updateClassMetadata,
};
