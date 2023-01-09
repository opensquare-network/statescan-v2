const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

async function queryInstanceDetails(classId, instanceId, blockHash) {
  const blockApi = await findBlockApi(blockHash);
  let raw;
  if (blockApi.query.uniques.asset) {
    raw = await blockApi.query.uniques.asset(classId, instanceId);
  } else if (blockApi.query.uniques.item) {
    raw = await blockApi.query.uniques.item(classId, instanceId);
  }
  return raw.toJSON();
}

module.exports = {
  queryInstanceDetails,
};
