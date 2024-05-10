const {
  vesting: { getVestingDb },
} = require("@statescan/mongo");

async function vestingScanHeight() {
  const db = await getVestingDb();
  return await db.getScanHeight();
}

module.exports = {
  vestingScanHeight,
};
