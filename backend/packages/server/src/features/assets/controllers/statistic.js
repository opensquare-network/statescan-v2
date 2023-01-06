const omit = require("lodash.omit");
const { HttpError } = require("../../../utils/httpError");
const {
  asset: { getAssetDailyStatisticCol },
} = require("@statescan/mongo");

function getQuery(assetId, assetHeight, from, to) {
  if (!from && !to) {
    return { assetId, assetHeight };
  }

  let startTime = parseInt(from) * 1000;
  let endTime = parseInt(to) * 1000;
  if (isNaN(startTime) && isNaN(endTime)) {
    throw new HttpError(400, "Invalid from or to query param");
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

async function getStatistic(ctx) {
  const { height, assetId } = ctx.params;
  const { from, to } = ctx.query;
  const q = getQuery(parseInt(assetId), parseInt(height), from, to);

  const col = await getAssetDailyStatisticCol();
  const items = await col.find(q).sort({ "indexer.blockHeight": 1 }).toArray();

  ctx.body = (items || []).map((item) =>
    omit(item, ["_id", "assetId", "assetHeight"]),
  );
}

module.exports = {
  getStatistic,
};
