const { extractPage } = require("../../../utils");
const {
  uniques: { getClassCol, getInstanceCol },
} = require("@statescan/mongo");

async function populateNftClass(items) {
  const classCol = await getClassCol();
  for (const item of items) {
    const nftClass = await classCol.findOne({
      classId: item.classId,
      classHeight: item.classHeight,
    });
    item.class = nftClass;
  }
}

async function getAccountNftInstances(ctx) {
  const { address } = ctx.params;
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }

  const q = {
    "details.owner": address,
    isDestroyed: false,
  };

  const instanceCol = await getInstanceCol();
  const items = await instanceCol
    .find(q)
    .sort({ classId: 1, instanceId: 1 })
    .skip(page * pageSize)
    .limit(pageSize)
    .toArray();

  await populateNftClass(items);

  const total = await instanceCol.countDocuments(q);

  ctx.body = {
    items,
    page,
    pageSize,
    total,
  };
}

module.exports = {
  getAccountNftInstances,
};
