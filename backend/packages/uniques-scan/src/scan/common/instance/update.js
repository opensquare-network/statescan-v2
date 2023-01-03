const { getClass } = require("../class/get");
const { busLogger: logger } = require("@osn/scan-common");
const {
  uniques: { getInstanceCol },
} = require("@statescan/mongo");

async function updateInstance(classId, instanceId, updates, indexer) {
  const nftClass = await getClass(classId);
  if (!nftClass) {
    logger.error(
      `Can not find class ${classId} when update instance, ${indexer}`,
    );
    return;
  }

  const instanceCol = await getInstanceCol();
  await instanceCol.updateOne(
    {
      classId,
      classHeight: nftClass.classHeight,
      instanceId,
      isDestroyed: false,
    },
    { $set: updates },
  );
}

module.exports = {
  updateInstance,
};
