const { getInstance } = require("./get");
const { busLogger: logger } = require("@osn/scan-common");
const {
  uniques: { getInstanceTimelineCol },
} = require("@statescan/mongo");

async function insertInstanceTimelineItem(
  classId,
  instanceId,
  timelineItem = {},
) {
  const instance = await getInstance(classId, instanceId);
  if (!instance) {
    logger.error(
      `Can not find instance ${classId}/${instanceId} when insert instance timeline item at ${timelineItem?.indexer?.blockHeight}`,
    );
    return;
  }

  const col = await getInstanceTimelineCol();
  await col.insertOne({
    classId,
    classHeight: instance.classHeight,
    instanceId,
    instanceHeight: instance.instanceHeight,
    ...timelineItem,
  });
}

module.exports = {
  insertInstanceTimelineItem,
};
