const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

async function queryInstanceMetadata(classId, instanceId, blockHash) {
  const blockApi = await findBlockApi(blockHash);
  let raw;
  if (blockApi.query.uniques.instanceMetadataOf) {
    raw = await blockApi.query.uniques.instanceMetadataOf(classId, instanceId);
  } else if (blockApi.query.uniques.itemMetadataOf) {
    raw = await blockApi.query.uniques.itemMetadataOf(classId, instanceId);
  }
  return raw.toJSON();
}

module.exports = {
  queryInstanceMetadata,
};
