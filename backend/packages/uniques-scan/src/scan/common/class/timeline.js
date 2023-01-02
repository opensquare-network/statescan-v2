const { getClass } = require("./get");
const {
  uniques: { getClassTimelineCol },
} = require("@statescan/mongo");
const { busLogger: logger } = require("@osn/scan-common");

async function insertClassTimelineItem(classId, timelineItem = {}) {
  const nftClass = await getClass(classId);
  if (!nftClass) {
    logger.error(`Can not find class ${classId} when set timeline item`);
    return;
  }

  const classHeight = nftClass.blockHeight;
  const col = await getClassTimelineCol();
  await col.insertOne({
    classId,
    classHeight,
    ...timelineItem,
  });
}

module.exports = {
  insertClassTimelineItem,
};
