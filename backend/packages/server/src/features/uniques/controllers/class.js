const { HttpError } = require("../../../utils");
const {
  uniques: { getClassCol, getClassTimelineCol, getClassAttributeCol },
} = require("@statescan/mongo");

async function countClassTimeline(classId, classHeight) {
  const col = await getClassTimelineCol();
  return await col.countDocuments({ classId, classHeight });
}

async function countClassAttributes(classId, classHeight) {
  const col = await getClassAttributeCol();
  return await col.countDocuments({ classId, classHeight });
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

  const timelineCount = await countClassTimeline(
    nftClass.classId,
    nftClass.classHeight,
  );
  const attributesCount = await countClassAttributes(
    nftClass.classId,
    nftClass.classHeight,
  );

  ctx.body = {
    ...nftClass,
    timelineCount,
    attributesCount,
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

  ctx.body = nftClass;
}

module.exports = {
  getClassById,
  getClassByIdAndHeight,
};
