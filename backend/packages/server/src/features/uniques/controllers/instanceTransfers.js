const pick = require("lodash.pick");
const { extractPage } = require("../../../utils");
const {
  uniques: { getInstanceTransferCol },
} = require("@statescan/mongo");

function normalizeTransfers(items) {
  return items.map((item) => pick(item, ["indexer", "from", "to"]));
}

async function getInstanceTransfers(ctx) {
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

  const col = await getInstanceTransferCol();
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
    items: normalizeTransfers(items),
    page,
    pageSize,
    total,
  };
}

module.exports = {
  getInstanceTransfers,
};
