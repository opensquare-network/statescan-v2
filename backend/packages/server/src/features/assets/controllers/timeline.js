const { extractPage } = require("../../../utils");
const {
  asset: { getAssetTimelineCol },
} = require("@statescan/mongo");

async function getAssetTimeline(ctx) {
  const { height, assetId } = ctx.params;
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }

  const q = {
    assetHeight: parseInt(height),
    assetId: parseInt(assetId),
  };

  const col = await getAssetTimelineCol();
  const items = await col
    .find(q)
    .sort({
      "indexer.blockHeight": 1,
      "indexer.extrinsicIndex": 1,
      "indexer.eventIndex": 1,
    })
    .skip(page * pageSize)
    .limit(pageSize)
    .toArray();

  const total = await col.countDocuments(q);

  ctx.body = {
    items,
    page,
    pageSize,
    total,
  };
}

module.exports = {
  getAssetTimeline,
};
