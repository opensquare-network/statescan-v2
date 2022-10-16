const { insertAssetTimeline } = require("../../mongo/assets/insertTimeline");
const { queryAsset } = require("../../query/assets/asset");
const {
  asset: { getAssetCol },
} = require("@statescan/mongo");
const {
  consts: { AssetModule },
} = require("@statescan/common");

/**
 *
 * @param event
 * @param indexer
 * @param isForced: for `ForceCreated` handling
 * @returns {Promise<void>}
 */
async function handleCreated(event, indexer, isForced = false) {
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

  const args = {
    assetId,
    owner: data[2].toString(),
  };
  if (!isForced) {
    Object.assign(args, { creator: data[1].toString() });
  }

  await insertAssetTimeline({
    ...assetIdentifier,
    indexer,
    name: method,
    args,
  });
}

module.exports = {
  handleCreated,
};
