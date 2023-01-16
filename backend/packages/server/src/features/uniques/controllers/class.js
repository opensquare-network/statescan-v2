const { HttpError, extractPage } = require("../../../utils");
const {
  uniques: { getClassCol, getInstanceCol },
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

async function getClassById(ctx) {
  const { classId } = ctx.params;

  const col = await getClassCol();
  const nftClass = await col.findOne({
    classId: parseInt(classId),
    isDestroyed: { $ne: true },
  });

  if (!nftClass) {
    throw new HttpError(404, "NFT Class not found");
  }

  ctx.body = nftClass;
}

async function getClassByIdAndHeight(ctx) {
  const { classId, classHeight } = ctx.params;

  const col = await getClassCol();
  const nftClass = await col.findOne({
    classId: parseInt(classId),
    classHeight: parseInt(classHeight),
  });

  if (!nftClass) {
    throw new HttpError(404, "NFT Class not found");
  }

  ctx.body = nftClass;
}

module.exports = {
  getClassById,
  getClassByIdAndHeight,
  getClassInstances,
};
