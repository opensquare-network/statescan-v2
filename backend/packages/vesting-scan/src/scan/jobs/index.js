const {
  vesting: { getVestingDb },
} = require("@statescan/mongo");
const { updateAccountsVesting } = require("./accounts");
const { clearBlockAccounts } = require("../../store/blockAccounts");

async function doJobsAfterBlock(indexer) {
  await updateAccountsVesting(indexer);
  clearBlockAccounts(indexer.blockHash);

  const db = await getVestingDb();
  await db.updateScanHeight(indexer.blockHeight);
}

module.exports = {
  doJobsAfterBlock,
};
