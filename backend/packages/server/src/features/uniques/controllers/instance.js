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

async function countInstanceTimeline(
  classId,
  classHeight,
  instanceId,
  instanceHeight,
) {
  const col = await getInstanceTimelineCol();
  return await col.countDocuments({
    classId,
    classHeight,
    instanceId,
    instanceHeight,
  });
}

async function countInstanceAttributes(
  classId,
  classHeight,
  instanceId,
  instanceHeight,
) {
  const col = await getInstanceAttributeCol();
  return await col.countDocuments({
    classId,
    classHeight,
    instanceId,
    instanceHeight,
  });
}

async function countInstanceTransfers() {
  const col = await getInstanceTransferCol();
  return await col.countDocuments({
    classId,
    classHeight,
    instanceId,
    instanceHeight,
  });
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

  const timelineCount = await countInstanceTimeline(
    nftInstance.classId,
    nftInstance.classHeight,
    nftInstance.instanceId,
    nftInstance.instanceHeight,
  );
  const attributesCount = await countInstanceAttributes(
    nftInstance.classId,
    nftInstance.classHeight,
    nftInstance.instanceId,
    nftInstance.instanceHeight,
  );
  const transfersCount = await countInstanceTransfers(
    nftInstance.classId,
    nftInstance.classHeight,
    nftInstance.instanceId,
    nftInstance.instanceHeight,
  );

  ctx.body = {
    ...nftInstance,
    class: nftClass,
    timelineCount,
    attributesCount,
    transfersCount,
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
