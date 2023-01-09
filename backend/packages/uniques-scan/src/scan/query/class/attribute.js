const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

async function queryClassAttribute(classId, key, blockHash) {
  const blockApi = await findBlockApi(blockHash);
  const raw = await blockApi.query.uniques.attribute(classId, null, key);
  return raw.toJSON();
}

module.exports = {
  queryClassAttribute,
};
