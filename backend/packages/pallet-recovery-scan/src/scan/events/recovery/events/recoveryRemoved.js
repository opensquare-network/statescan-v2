const {
  palletRecovery: {
    updateActiveRecoverable,
    getRecoverableTimelineCol,
    getActiveRecoverableOrThrow,
  },
} = require("@statescan/mongo");

async function handleRecoveryRemoved(event, indexer) {
  const { method, data } = event;
  const lostAccount = data[0].toString();

  const recoverable = await getActiveRecoverableOrThrow(
    lostAccount,
    indexer.blockHeight,
  );
  await updateActiveRecoverable(lostAccount, {
    isActive: false,
    removedAt: indexer,
  });

  const timelineCol = await getRecoverableTimelineCol();
  await timelineCol.insertOne({
    recoverableHeight: recoverable.height,
    who: lostAccount,
    name: method,
    args: { lostAccount },
    indexer,
  });
}

module.exports = {
  handleRecoveryRemoved,
};
