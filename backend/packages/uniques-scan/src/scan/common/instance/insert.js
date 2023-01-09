const { queryInstanceDetails } = require("../../query/instance/details");
const { getClass } = require("../class/get");
const { busLogger: logger } = require("@osn/scan-common");
const {
  uniques: { getInstanceCol },
} = require("@statescan/mongo");

async function insertInstanceWithDetails(classId, instanceId, indexer) {
  const nftClass = await getClass(classId);
  if (!nftClass) {
    logger.error(`Can not find class ${classId} when insert new instance`);
    return;
  }

  const details = await queryInstanceDetails(
    classId,
    instanceId,
    indexer.blockHash,
  );
  const col = await getInstanceCol();
  await col.insertOne({
    classId,
    classHeight: nftClass.classHeight,
    instanceId,
    instanceHeight: indexer.blockHeight,
    indexer,
    details,
    isDestroyed: false,
  });
}

module.exports = {
  insertInstanceWithDetails,
};
