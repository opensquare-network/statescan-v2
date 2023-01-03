const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

async function queryClassMetadata(classId, blockHash) {
  const blockApi = await findBlockApi(blockHash);
  const raw = await blockApi.query.uniques.classMetadataOf(classId);
  return raw.toJSON();
}

module.exports = {
  queryClassMetadata,
};
