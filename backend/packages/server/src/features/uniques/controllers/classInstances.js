const { extractPage } = require("../../../utils");
const {
  uniques: { getInstanceCol },
} = require("@statescan/mongo");

async function getClassInstances(ctx) {
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }

  const { classId, classHeight } = ctx.params;

  const q = {
    classId: parseInt(classId),
    classHeight: parseInt(classHeight),
  };
  const instanceCol = await getInstanceCol();
  const items = await instanceCol
    .find(q)
    .sort({ instanceId: 1 })
    .skip(page * pageSize)
    .limit(pageSize)
    .toArray();
  const total = await instanceCol.countDocuments(q);

  ctx.body = {
    items,
    page,
    pageSize,
    total,
  };
}

module.exports = {
  getClassInstances,
};
