const {
  palletAsset: { getActiveAsset, getStatisticCol },
} = require("@statescan/mongo");
const isNil = require("lodash.isnil");

function getQuery(assetId, assetHeight, from, to) {
  if (!from && !to) {
    return { assetId, assetHeight };
  }

  let startTime = parseInt(from) * 1000;
  let endTime = parseInt(to) * 1000;
  if (isNaN(startTime) && isNaN(endTime)) {
    throw new Error("Invalid from or to query param");
  }

  if (!isNaN(startTime) && !isNaN(endTime)) {
    return {
      $and: [
        { assetId },
        { assetHeight },
        { "indexer.blockTime": { $gte: startTime } },
        { "indexer.blockTime": { $lte: endTime } },
      ],
    };
  }

  if (!isNaN(startTime)) {
    return {
      $and: [
        { assetId },
        { assetHeight },
        { "indexer.blockTime": { $gte: startTime } },
      ],
    };
  }

  if (!isNaN(endTime)) {
    return {
      $and: [
        { assetId },
        { assetHeight },
        { "indexer.blockTime": { $lte: endTime } },
      ],
    };
  }

  return { assetId, assetHeight };
}

async function historyStatistics(_, _args) {
  const { assetId, assetHeight: assetHeightArg, from, to } = _args;

  let assetHeight = assetHeightArg;
  if (isNil(assetHeight)) {
    const asset = await getActiveAsset(assetId);
    if (!asset) {
      throw new Error(`No active asset: ${assetId}`);
    }
    assetHeight = asset.assetHeight;
  }

  const q = getQuery(assetId, assetHeight, from, to);
  const col = await getStatisticCol();
  return await col.find(q).sort({ "indexer.blockHeight": 1 }).toArray();
}

module.exports = {
  historyStatistics,
};
