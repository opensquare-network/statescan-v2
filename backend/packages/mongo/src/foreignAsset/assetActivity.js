const isNil = require("lodash.isnil");
const { getAssetActivityCol } = require("./db");

async function insertForeignAssetActivity(assetId, name, args = {}, indexer) {
  if (isNil(assetId)) {
    return;
  }

  const col = await getAssetActivityCol();
  await col.insertOne({
    assetId,
    name,
    args,
    indexer,
  });
}

module.exports = {
  insertForeignAssetActivity,
};
