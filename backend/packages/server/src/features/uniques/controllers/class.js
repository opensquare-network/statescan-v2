const { HttpError } = require("../../../utils");
const {
  uniques: { getClassCol, getClassTimelineCol, getClassAttributeCol },
} = require("@statescan/mongo");

async function countClassTimeline(q) {
  const col = await getClassTimelineCol();
  return await col.countDocuments(q);
}

async function countClassAttributes(q) {
  const col = await getClassAttributeCol();
  return await col.countDocuments(q);
}

async function countAll(classId, classHeight) {
  const q = { classId, classHeight };
  const timelineCount = await countClassTimeline(q);
  const attributesCount = await countClassAttributes(q);
  return {
    timelineCount,
    attributesCount,
  };
}

async function getClassById(ctx) {
  const { classId } = ctx.params;

  const col = await getClassCol();
  const nftClass = await col.findOne({
    classId: parseInt(classId),
    isDestroyed: false,
  });

  if (!nftClass) {
    throw new HttpError(404, "NFT Class not found");
  }

  const counts = await countAll(nftClass.classId, nftClass.classHeight);

  ctx.body = {
    ...nftClass,
    ...counts,
  };
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

  const counts = await countAll(nftClass.classId, nftClass.classHeight);

  ctx.body = {
    ...nftClass,
    ...counts,
  };
}

module.exports = {
  getClassById,
  getClassByIdAndHeight,
};
