const { extractPage, isTrue } = require("../../../utils");
const {
  uniques: { getClassCol },
} = require("@statescan/mongo");

async function getClasses(ctx) {
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }

  const { destroyed, category, status } = ctx.query;

  const q = { isDestroyed: isTrue(destroyed) };
  if (status === "frozen") {
    q["details.isFrozen"] = true;
  }
  if (category === "recognized") {
    q["definitionValid"] = true;
  }
  if (category === "unrecognized") {
    q["definitionValid"] = false;
  }

  const col = await getClassCol();
  const items = await col
    .find(q, { projection: { _id: 0 } })
    .sort({ classId: 1 })
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
  getClasses,
};
