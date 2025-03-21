const {
  foreignAsset: { getAssetTimelineCol },
} = require("@statescan/mongo");

async function foreignAssetTimeline(_, _args) {
  const { offset, limit, assetId } = _args;
  if (parseInt(limit) > 100) {
    throw new Error("Over max page size 100");
  }

  const q = { assetId };
  const col = await getAssetTimelineCol();
  const items = await col
    .find(q, { projection: { _id: 0 } })
    .sort({ "indexer.blockHeight": 1, "indexer.eventIndex": 1 })
    .skip(offset)
    .limit(limit)
    .toArray();
  const total = await col.countDocuments(q);

  return {
    items,
    offset,
    limit,
    total,
  };
}

module.exports = {
  foreignAssetTimeline,
};
