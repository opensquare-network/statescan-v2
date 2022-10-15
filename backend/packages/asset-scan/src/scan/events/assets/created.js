const { queryAsset } = require("../../query/assets/asset");
const {
  asset: { getAssetCol },
} = require("@statescan/mongo");
const {
  consts: { AssetModule },
} = require("@statescan/common");

async function handleCreated(event, indexer) {
  const assetId = event.data[0].toNumber();
  const asset = await queryAsset(indexer.blockHash, assetId);

  const col = await getAssetCol();
  await col.insertOne({
    assetId,
    assetHeight: indexer.blockHeight,
    module: AssetModule.assets,
    detail: asset,
    destroyed: false,
  });
  // todo: 1. save asset to database -> done
  // todo: 2. save asset timeline
}

module.exports = {
  handleCreated,
};
