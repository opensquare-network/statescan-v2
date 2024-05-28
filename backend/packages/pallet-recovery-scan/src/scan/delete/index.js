const {
  palletRecovery: {
    getRecoverableCol,
    getRecoverableTimelineCol,
    getRecoveryCol,
    getRecoveryTimelineCol,
    getRecoveredCallCol,
  },
} = require("@statescan/mongo");

async function deleteFrom(height) {
  if (!height) {
    throw new Error("No height given when deleting business");
  }

  const recoverableCol = await getRecoverableCol();
  await recoverableCol.deleteMany({ height: { $gte: height } });

  const recoverableTimelineCol = await getRecoverableTimelineCol();
  await recoverableTimelineCol.deleteMany({
    "indexer.blockHeight": { $gte: height },
  });

  const recoveryCol = await getRecoveryCol();
  await recoveryCol.deleteMany({ created: { $gte: height } });

  const recoveryTimelineCol = await getRecoveryTimelineCol();
  await recoveryTimelineCol.deleteMany({
    "indexer.blockHeight": { $gte: height },
  });

  const callCol = await getRecoveredCallCol();
  await callCol.deleteMany({ "indexer.blockHeight": { $gte: height } });
}

module.exports = {
  deleteFrom,
};
