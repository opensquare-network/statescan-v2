const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

async function queryClassMetadata(classId, blockHash) {
  const blockApi = await findBlockApi(blockHash);
  let raw;
  if (blockApi.query.uniques.classMetadataOf) {
    raw = await blockApi.query.uniques.classMetadataOf(classId);
  } else if (blockApi.query.uniques.collectionMetadataOf) {
    raw = await blockApi.query.uniques.collectionMetadataOf(classId);
  }
  return raw.toJSON();
}

module.exports = {
  queryClassMetadata,
};
