const { queryAsset } = require("../../query/assets/asset");
const {
  asset: { getAssetCol, getAssetTimelineCol },
} = require("@statescan/mongo");
const {
  consts: { AssetModule },
} = require("@statescan/common");

async function handleCreated(event, indexer) {
  const { method, data } = event;
  const assetId = data[0].toNumber();
  const asset = await queryAsset(indexer.blockHash, assetId);

  const assetIdentifier = {
    assetId,
    assetHeight: indexer.blockHeight,
    module: AssetModule.assets,
  };

  const col = await getAssetCol();
  await col.insertOne({
    ...assetIdentifier,
    detail: asset,
    destroyed: false,
  });

  const timelineCol = await getAssetTimelineCol();
  await timelineCol.insertOne({
    ...assetIdentifier,
    indexer,
    name: method,
    args: {
      assetId,
      creator: data[1].toString(),
      owner: data[2].toString(),
    },
  });
}

module.exports = {
  handleCreated,
};
