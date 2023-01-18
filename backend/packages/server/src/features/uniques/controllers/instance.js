const { HttpError } = require("../../../utils");
const {
  uniques: { getInstanceCol, getClassCol },
} = require("@statescan/mongo");

async function getInstanceById(ctx) {
  const { classId, instanceId } = ctx.params;

  const classCol = await getClassCol();
  const nftClass = await classCol.findOne({
    classId: parseInt(classId),
    isDestroyed: { $ne: true },
  });

  if (!nftClass) {
    throw new HttpError(404, "NFT Instance not found");
  }

  const instanceCol = await getInstanceCol();
  const nftInstance = await instanceCol.findOne({
    classId: nftClass.classId,
    classHeight: nftClass.classHeight,
    instanceId: parseInt(instanceId),
    isDestroyed: { $ne: true },
  });

  if (!nftInstance) {
    throw new HttpError(404, "NFT Instance not found");
  }

  ctx.body = {
    ...nftInstance,
    class: nftClass,
  };
}

async function getInstanceByIdAndHeight(ctx) {
  const { classId, classHeight, instanceId, instanceHeight } = ctx.params;

  const col = await getInstanceCol();
  const nftInstance = await col.findOne({
    classId: parseInt(classId),
    classHeight: parseInt(classHeight),
    instanceId: parseInt(instanceId),
    instanceHeight: parseInt(instanceHeight),
  });

  if (!nftInstance) {
    throw new HttpError(404, "NFT Instance not found");
  }

  const classCol = await getClassCol();
  nftInstance.class = await classCol.findOne({
    classId: nftInstance.classId,
    classHeight: nftInstance.classHeight,
  });

  ctx.body = nftInstance;
}

module.exports = {
  getInstanceById,
  getInstanceByIdAndHeight,
};
