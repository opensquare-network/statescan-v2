const { queryInstancePrice } = require("../../query/instance/price");
const { queryInstanceDetails } = require("../../query/instance/details");
const { getClass } = require("../class/get");
const { busLogger: logger } = require("@osn/scan-common");
const {
  uniques: { getInstanceCol },
} = require("@statescan/mongo");

async function updateInstance(classId, instanceId, updates, indexer) {
  const nftClass = await getClass(classId);
  if (!nftClass) {
    logger.error(
      `Can not find class ${classId} when update instance at ${indexer.blockHeight}`,
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

async function updateInstanceDetails(classId, instanceId, indexer) {
  const details = await queryInstanceDetails(
    classId,
    instanceId,
    indexer.blockHash,
  );

  await updateInstance(classId, instanceId, { details }, indexer);
}

async function updateInstancePrice(classId, instanceId, indexer) {
  const priceTuple = await queryInstancePrice(
    classId,
    instanceId,
    indexer.blockHash,
  );
  let updates = {
    price: null,
    whitelistedBuyer: null,
  };
  if (priceTuple) {
    updates = {
      price: priceTuple[0],
      whitelistedBuyer: priceTuple[1],
    };
  }

  await updateInstance(classId, instanceId, updates, indexer);
}

module.exports = {
  updateInstance,
  updateInstanceDetails,
  updateInstancePrice,
};
