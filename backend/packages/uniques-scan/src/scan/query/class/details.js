const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

async function queryClassDetails(classId, blockHash) {
  const blockApi = await findBlockApi(blockHash);
  let raw;
  if (blockApi.query.uniques.class) {
    raw = await blockApi.query.uniques.class(classId);
  } else if (blockApi.query.uniques.collection) {
    raw = await blockApi.query.uniques.collection(classId);
  }
  return raw.toJSON();
}

module.exports = {
  queryClassDetails,
};
