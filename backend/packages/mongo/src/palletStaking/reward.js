const { getStakingRewardCol } = require("./db");

async function insertStakingReward(rewardData) {
  const col = await getStakingRewardCol();
  await col.insertOne(rewardData);
}

module.exports = {
  insertStakingReward,
};
