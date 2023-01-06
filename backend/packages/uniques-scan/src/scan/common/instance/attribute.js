const { getInstance } = require("./get");
const { getClass } = require("../class/get");
const { busLogger: logger } = require("@osn/scan-common");
const {
  uniques: { getInstanceAttributeCol },
} = require("@statescan/mongo");

async function insertInstanceAttribute(
  classId,
  instanceId,
  key,
  value,
  deposit,
  indexer,
) {
  const nftClass = await getClass(classId);
  if (!nftClass) {
    logger.error(`Can not find class ${classId} at ${indexer.blockHeight}`);
    return;
  }

  const instance = await getInstance(classId, instanceId);
  if (!instance) {
    logger.error(
      `Can not find instance /${classId}/${instanceId} when set instance attribute, ${indexer.blockHeight}`,
    );
    return;
  }

  const col = await getInstanceAttributeCol();
  await col.insertOne({
    classId,
    classHeight: nftClass.classHeight,
    instanceId,
    instanceHeight: instance.instanceHeight,
    key,
    value,
    deposit,
    indexer,
  });
}

async function deleteInstanceAttribute(classId, instanceId, key) {
  const nftClass = await getClass(classId);
  if (!nftClass) {
    logger.error(`Can not find class ${classId} at ${indexer.blockHeight}`);
    return;
  }

  const instance = await getInstance(classId, instanceId);
  if (!instance) {
    logger.error(
      `Can not find instance /${classId}/${instanceId} when delete instance attribute, ${indexer.blockHeight}`,
    );
    return;
  }

  const col = await getInstanceAttributeCol();
  await col.deleteOne({
    classId,
    classHeight,
    instanceId,
    instanceHeight: instance.instanceHeight,
    key,
  });
}

module.exports = {
  insertInstanceAttribute,
  deleteInstanceAttribute,
};
