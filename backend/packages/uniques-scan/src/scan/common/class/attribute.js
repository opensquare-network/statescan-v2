const { getClass } = require("./get");
const {
  uniques: { getClassAttributeCol },
} = require("@statescan/mongo");
const { busLogger: logger } = require("@osn/scan-common");

async function insertClassAttribute(classId, key, value, deposit, indexer) {
  const nftClass = await getClass(classId);
  if (!nftClass) {
    logger.error(`Can not find class ${classId} when set timeline item`);
    return;
  }

  const col = await getClassAttributeCol();
  await col.insertOne({
    classId,
    classHeight: nftClass.blockHeight,
    key,
    value,
    deposit,
    indexer,
  });
}

async function deleteClassAttribute(classId, key) {
  const nftClass = await getClass(classId);
  if (!nftClass) {
    logger.error(
      `Can not find class ${classId} when set attribute key: ${key}, value: ${value}`,
    );
    return;
  }

  const col = await getClassAttributeCol();
  await col.deleteOne({
    classId,
    classHeight: nftClass.blockHeight,
    key,
  });
}

module.exports = {
  insertClassAttribute,
  deleteClassAttribute,
};
