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
 * @param extrinsic
 * @param isForced: for `ForceCreated` handling
 * @returns {Promise<void>}
 */
async function handleCreated(event, indexer, extrinsic, isForced = false) {
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
    metadata: null,
    destroyed: false,
  });

  const owner = isForced ? data[1].toString() : data[2].toString();
  const args = {
    assetId,
    owner,
  };
  if (!isForced) {
    Object.assign(args, { creator: data[1].toString() });
  }
  await insertAssetTimeline(assetId, method, args, indexer);
}

module.exports = {
  handleCreated,
};
