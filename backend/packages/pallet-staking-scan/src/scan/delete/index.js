const {
  palletStaking: {
    getStakingRewardCol,
    getStakingRewardTimelineCol,
  },
} = require("@statescan/mongo");

async function deleteFrom(height) {
  if (!height) {
    throw new Error("No height given when deleting unFinalized staking data");
  }

  const commonQ = { "indexer.blockHeight": { $gte: height } };

  const rewardCol = await getStakingRewardCol();
  await rewardCol.deleteMany(commonQ);

  const timelineCol = await getStakingRewardTimelineCol();
  await timelineCol.deleteMany(commonQ);
}

module.exports = {
  deleteFrom,
};