const {
  uniques: { getClassCol },
} = require("@statescan/mongo");
const isEmpty = require("lodash.isempty");
const { queryClassDetails } = require("../../query/class/details");
const { queryClassMetadata } = require("../../query/class/metadata");
const crypto = require("crypto");

// calculate md5 hash of the input data
function md5(data) {
  return crypto.createHash("md5").update(data).digest("hex");
}

async function updateClassMetadata(classId, indexer) {
  const metadata = await queryClassMetadata(classId, indexer.blockHash);
  let updates;
  if (!metadata) {
    updates = {
      metadata: null,
      dataHash: null,
    };
  } else {
    updates = {
      metadata,
      dataHash: md5(metadata.data),
    };
  }
  await updateClass(classId, updates);
}

async function updateClassDetails(classId, indexer) {
  const details = await queryClassDetails(classId, indexer.blockHash);
  await updateClass(classId, { details });
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
  updateClassDetails,
};
