const { extractPage } = require("../../../utils");
const {
  uniques: { getInstanceTimelineCol },
} = require("@statescan/mongo");

async function getInstanceTimeline(ctx) {
  const { classId, classHeight, instanceId, instanceHeight } = ctx.params;
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }

  const q = {
    classHeight: parseInt(classHeight),
    classId: parseInt(classId),
    instanceHeight: parseInt(instanceHeight),
    instanceId: parseInt(instanceId),
  };

  const col = await getInstanceTimelineCol();
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
  getInstanceTimeline,
};
