const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

async function queryInstancePrice(classId, instanceId, blockHash) {
  const blockApi = await findBlockApi(blockHash);
  const raw = await blockApi.query.uniques.itemPriceOf(classId, instanceId);
  return raw.toJSON();
}

module.exports = {
  queryInstancePrice,
};
