const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

async function queryClassDetails(classId, blockHash) {
  const blockApi = await findBlockApi(blockHash);
  const raw = await blockApi.query.uniques.class(classId);
  return raw.toJSON();
}

module.exports = {
  queryClassDetails,
};
