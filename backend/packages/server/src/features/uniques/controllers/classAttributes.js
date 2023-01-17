const pick = require("lodash.pick");
const { extractPage } = require("../../../utils");
const {
  uniques: { getClassAttributeCol },
} = require("@statescan/mongo");

function normalizeAttributes(items) {
  return items.map((item) =>
    pick(item, ["indexer", "key", "value", "deposit"]),
  );
}

async function getClassAttributes(ctx) {
  const { classId, classHeight } = ctx.params;
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }

  const q = {
    classHeight: parseInt(classHeight),
    classId: parseInt(classId),
  };

  const col = await getClassAttributeCol();
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
    items: normalizeAttributes(items),
    page,
    pageSize,
    total,
  };
}

module.exports = {
  getClassAttributes,
};
