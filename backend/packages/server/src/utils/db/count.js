const isEmpty = require("lodash.isempty");

async function queryCount(col, q) {
  if (isEmpty(q)) {
    return await col.estimatedDocumentCount();
  }
  return await col.countDocuments(q);
}

module.exports = {
  queryCount,
};
