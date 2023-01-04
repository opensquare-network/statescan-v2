const { getClass } = require("../class/get");
const {
  uniques: { getInstanceCol },
} = require("@statescan/mongo");
const { busLogger: logger } = require("@osn/scan-common");

async function getInstance(classId, instanceId) {
  const nftClass = await getClass(classId);
  if (!nftClass) {
    logger.error(`Can not find class ${classId}`);
    return;
  }

  const classHeight = nftClass.classHeight;
  const instanceCol = await getInstanceCol();
  const nftInstance = await instanceCol.findOne({
    classId,
    classHeight,
    instanceId,
    isDestroyed: false,
  });
  if (!nftInstance) {
    logger.error(`Can not find instance /${classId}/${instanceId}`);
    return;
  }

  return nftInstance;
}

module.exports = {
  getInstance,
};
