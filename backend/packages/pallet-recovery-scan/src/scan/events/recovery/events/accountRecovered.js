const { queryRecovery } = require("../../../query");
const {
  palletRecovery: {
    updateActiveRecovery,
    getRecoveryTimelineCol,
    updateActiveRecoverable,
  },
} = require("@statescan/mongo");
const { setProxyHeightMark } = require("../../../../store/proxy");

async function handleAccountRecovered(event, indexer) {
  setProxyHeightMark(indexer.blockHeight);

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
      `Can not query recovery when recovered at ${indexer.blockHeight}`,
    );
  }
  await updateActiveRecovery(lostAccount, rescuerAccount, recovery);
  await updateActiveRecoverable(lostAccount, { rescuer: rescuerAccount });

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
  handleAccountRecovered,
};
