const { queryRecovery } = require("../../../query");
const {
  palletRecovery: { updateActiveRecovery, getRecoveryTimelineCol },
} = require("@statescan/mongo");

async function handleRecoveryVouched(event, indexer) {
  const { method, data } = event;
  const lostAccount = data[0].toString();
  const rescuerAccount = data[1].toString();
  const sender = data[1].toString();

  const recovery = await queryRecovery(
    indexer.blockHash,
    lostAccount,
    rescuerAccount,
  );
  if (!recovery) {
    throw new Error(
      `Can not query recovery when vouched at ${indexer.blockHeight}`,
    );
  }
  await updateActiveRecovery(lostAccount, rescuerAccount, recovery);

  const timelineCol = await getRecoveryTimelineCol();
  await timelineCol.insertOne({
    lostAccount,
    rescuerAccount,
    created: recovery.created,
    name: method,
    args: { lostAccount, rescuerAccount, sender },
    indexer,
  });
}

module.exports = {
  handleRecoveryVouched,
};
