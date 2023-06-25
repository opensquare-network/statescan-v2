const { upsertAccounts, upsertAccountTimeline } = require("../mongo");
const {
  getAccounts,
  getAccountTimelines,
  clearAccounts,
} = require("../store/account");

async function handleAccountChanges() {
  const accounts = await getAccounts();
  const accountTimelines = await getAccountTimelines();

  await upsertAccounts(accounts);
  await upsertAccountTimeline(accountTimelines);

  clearAccounts();
}

module.exports = {
  handleAccountChanges,
};
