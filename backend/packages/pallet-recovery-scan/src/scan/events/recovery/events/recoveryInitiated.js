const {
  palletRecovery: {
    getRecoveryCol,
    getRecoveryTimelineCol,
    getLatestRecoverable,
  },
} = require("@statescan/mongo");
const { queryRecovery } = require("../../../query");

async function handleRecoveryInitiated(event, indexer) {
  const { method, data } = event;
  const lostAccount = data[0].toString();
  const rescuerAccount = data[1].toString();

  const recovery = await queryRecovery(
    indexer.blockHash,
    lostAccount,
    rescuerAccount,
  );
  if (!recovery) {
    throw new Error(
      `Can not query recovery when initialized at ${indexer.blockHeight}`,
    );
  }

  const recoverable = await getLatestRecoverable(lostAccount);
  if (!recoverable) {
    throw new Error(
      `Can not get recoverable when recovery initialized at ${indexer.blockHeight}`,
    );
  }

  const col = await getRecoveryCol();
  await col.insertOne({
    lostAccount,
    rescuerAccount,
    isClosed: false,
    ...recovery,
    allFriends: recoverable.friends,
    threshold: recoverable.threshold,
  });

  const timelineCol = await getRecoveryTimelineCol();
  await timelineCol.insertOne({
    lostAccount,
    rescuerAccount,
    created: recovery.created,
    name: method,
    args: { lostAccount, rescuerAccount },
    indexer,
  });
}

module.exports = {
  handleRecoveryInitiated,
};
