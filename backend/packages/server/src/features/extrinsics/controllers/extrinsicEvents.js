const { extractPage } = require("../../../utils");
const {
  block: { getEventCollection },
} = require("@statescan/mongo");

async function getExtrinsicEvents(ctx) {
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }

  const { blockHeight, extrinsicIndex } = ctx.params;
  const q = {
    "indexer.blockHeight": parseInt(blockHeight),
    "indexer.extrinsicIndex": parseInt(extrinsicIndex),
  };
  const col = await getEventCollection();
  const items = await col
    .find(q, { projection: { _id: 0 } })
    .sort({ "indexer.callIndex": 1 })
    .skip(page * pageSize)
    .limit(pageSize)
    .toArray();
  const total = await col.count(q);

  ctx.body = {
    items,
    page,
    pageSize,
    total,
  };
}

module.exports = {
  getExtrinsicEvents,
};
