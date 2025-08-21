const {
  palletStaking: { getStakingDb },
} = require("@statescan/mongo");

async function stakingScanHeight() {
  const db = await getStakingDb();
  return await db.getScanHeight();
}

module.exports = {
  stakingScanHeight,
};
