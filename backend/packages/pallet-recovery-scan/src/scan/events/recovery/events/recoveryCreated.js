const {
  palletRecovery: { getRecoverableCol, getRecoverableTimelineCol },
} = require("@statescan/mongo");
const { queryRecoverable } = require("../../../query");

async function handleRecoveryCreated(event, indexer) {
  const { method, data } = event;
  const who = data[0].toString();

  const recoverable = await queryRecoverable(indexer.blockHash, who);
  if (!recoverable) {
    throw new Error(
      `Can not query recoverable when crated at ${indexer.blockHeight}`,
    );
  }

  const recoverableCol = await getRecoverableCol();
  await recoverableCol.insertOne({
    height: indexer.blockHeight,
    who,
    isActive: true,
    ...recoverable,
  });

  const timelineCol = await getRecoverableTimelineCol();
  await timelineCol.insertOne({
    recoverableHeight: indexer.blockHeight,
    who,
    name: method,
    args: { who },
    indexer,
  });
}

module.exports = {
  handleRecoveryCreated,
};
