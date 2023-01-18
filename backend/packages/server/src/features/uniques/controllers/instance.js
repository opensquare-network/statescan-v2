const { HttpError } = require("../../../utils");
const {
  uniques: {
    getInstanceCol,
    getClassCol,
    getInstanceTimelineCol,
    getInstanceAttributeCol,
    getInstanceTransferCol,
  },
} = require("@statescan/mongo");

async function countInstanceTimeline(q) {
  const col = await getInstanceTimelineCol();
  return await col.countDocuments(q);
}

async function countInstanceAttributes(q) {
  const col = await getInstanceAttributeCol();
  return await col.countDocuments(q);
}

async function countInstanceTransfers(q) {
  const col = await getInstanceTransferCol();
  return await col.countDocuments(q);
}

async function countAll(classId, classHeight, instanceId, instanceHeight) {
  const q = {
    classId,
    classHeight,
    instanceId,
    instanceHeight,
  };
  const timelineCount = await countInstanceTimeline(q);
  const attributesCount = await countInstanceAttributes(q);
  const transfersCount = await countInstanceTransfers(q);

  return {
    timelineCount,
    attributesCount,
    transfersCount,
  };
}

async function getInstanceById(ctx) {
  const { classId, instanceId } = ctx.params;

  const classCol = await getClassCol();
  const nftClass = await classCol.findOne({
    classId: parseInt(classId),
    isDestroyed: false,
  });

  if (!nftClass) {
    throw new HttpError(404, "NFT Instance not found");
  }

  const instanceCol = await getInstanceCol();
  const nftInstance = await instanceCol.findOne({
    classId: nftClass.classId,
    classHeight: nftClass.classHeight,
    instanceId: parseInt(instanceId),
    isDestroyed: false,
  });

  if (!nftInstance) {
    throw new HttpError(404, "NFT Instance not found");
  }

  const counts = await countAll(
    nftInstance.classId,
    nftInstance.classHeight,
    nftInstance.instanceId,
    nftInstance.instanceHeight,
  );

  ctx.body = {
    ...nftInstance,
    ...counts,
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

  const counts = await countAll(
    nftInstance.classId,
    nftInstance.classHeight,
    nftInstance.instanceId,
    nftInstance.instanceHeight,
  );

  ctx.body = {
    ...nftInstance,
    ...counts,
    class: nftClass,
  };
}

module.exports = {
  getInstanceById,
  getInstanceByIdAndHeight,
};
