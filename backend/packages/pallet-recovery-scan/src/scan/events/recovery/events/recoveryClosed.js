const { queryRecovery } = require("../../../query");
const {
  palletRecovery: {
    updateActiveRecovery,
    getRecoveryTimelineCol,
    getActiveRecoveryOrThrow,
  },
} = require("@statescan/mongo");

async function handleRecoveryClosed(event, indexer) {
  const { method, data } = event;
  const lostAccount = data[0].toString();
  const rescuerAccount = data[1].toString();

  const activeRecovery = await getActiveRecoveryOrThrow(
    lostAccount,
    rescuerAccount,
    indexer.blockHeight,
  );
  const recovery = await queryRecovery(
    indexer.blockHash,
    lostAccount,
    rescuerAccount,
  );
  if (recovery) {
    throw new Error(
      `Recovery should be nil when closed at ${indexer.blockHeight}`,
    );
  }
  await updateActiveRecovery(lostAccount, rescuerAccount, {
    isClosed: true,
    closedAt: indexer,
  });

  const timelineCol = await getRecoveryTimelineCol();
  await timelineCol.insertOne({
    lostAccount,
    rescuerAccount,
    created: activeRecovery.created,
    name: method,
    args: { lostAccount, rescuerAccount },
    indexer,
  });
}

module.exports = {
  handleRecoveryClosed,
};
