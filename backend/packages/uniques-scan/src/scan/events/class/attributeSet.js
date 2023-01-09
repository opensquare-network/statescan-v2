const { insertClassAttribute } = require("../../common/class/attribute");
const { queryClassAttribute } = require("../../query/class/attribute");
const { logger } = require("@osn/scan-common");

async function handleAttributeSet(event, indexer) {
  const [classId, maybeInstanceId, key] = event.data.toJSON();
  if (maybeInstanceId) {
    return;
  }

  const valueDepositTuple = await queryClassAttribute(
    classId,
    key,
    indexer.blockHash,
  );
  if (!valueDepositTuple || !Array.isArray(valueDepositTuple)) {
    logger.error(
      "Can not get attribute value at class AttributeSet event",
      indexer,
    );
    return;
  }

  const [value, deposit] = valueDepositTuple;
  await insertClassAttribute(classId, key, value, deposit, indexer);
}

module.exports = {
  handleAttributeSet,
};
