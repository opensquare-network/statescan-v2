const { HttpError } = require("../../../utils");
const {
  uniques: { getClassCol },
} = require("@statescan/mongo");

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
};
