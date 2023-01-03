const { insertInstanceAttribute } = require("../../common/instance/attribute");
const { queryInstanceAttribute } = require("../../query/instance/attribute");
const { logger } = require("@osn/scan-common");

async function handleAttributeSet(event, indexer) {
  const [classId, maybeInstanceId, key] = event.data.toJSON();
  if (!maybeInstanceId) {
    return;
  }

  const valueDepositTuple = await queryInstanceAttribute(
    classId,
    maybeInstanceId,
    key,
    indexer.blockHash,
  );
  if (!valueDepositTuple || !Array.isArray(valueDepositTuple)) {
    logger.error(
      `Can not get instance ${classId}/${maybeInstanceId} attribute value at ${indexer.blockHeight}`,
    );
    return;
  }

  const [value, deposit] = valueDepositTuple;
  await insertInstanceAttribute(
    classId,
    maybeInstanceId,
    key,
    value,
    deposit,
    indexer,
  );
}

module.exports = {
  handleAttributeSet,
};
