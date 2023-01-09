const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

async function queryInstanceAttribute(classId, instanceId, key, blockHash) {
  const blockApi = await findBlockApi(blockHash);
  const raw = await blockApi.query.uniques.attribute(classId, instanceId, key);
  return raw.toJSON();
}

module.exports = {
  queryInstanceAttribute,
};
