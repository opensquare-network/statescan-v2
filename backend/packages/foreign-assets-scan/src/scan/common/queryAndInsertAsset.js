const {
  foreignAsset: { getAssetCol },
} = require("@statescan/mongo");
const { queryForeignAsset } = require("../query/assets/assets");
const { queryForeignAssetMetadata } = require("../query/assets/metadata");

async function queryAndInsertAsset(hash, location, indexer) {
  const col = await getAssetCol();
  const detail = await queryForeignAsset(indexer.blockHash, location);
  const metadata = await queryForeignAssetMetadata(indexer.blockHash, location);
  await col.insertOne({
    assetId: hash,
    assetHeight: indexer.blockHeight,
    detail,
    metadata,
  });
}

module.exports = {
  queryAndInsertAsset,
};
