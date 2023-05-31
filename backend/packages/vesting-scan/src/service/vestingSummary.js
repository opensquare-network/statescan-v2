const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

const { getVestingEvents } = require("../store/event");

async function generateVestingSummary(indexer) {
  const events = getVestingEvents(indexer);
  if (events.length <= 0) {
    return;
  }

  const accounts = await findChangedAccounts(events);
  const api = await findBlockApi(indexer.blockHash);

  const accountScheduels = await fetchAllVestings(api);

  const vestingSummary = {
    numSchedules: 0,
    numActiveSchedules: 0,
    lockedAmount: 0n,
    indexer,
  };
  const accountSummaryList = [];
  for (const [accountHash, maybeSchedules] of accountScheduels) {
    const account = accountHash.args.toString();
    const schedules = maybeSchedules.unwrap();
    let numSchedules = schedules.length;
    let numActiveSchedules = schedules.filter(
      (schedule) => schedule.locked > 0,
    ).length;
    let lockedAmount = schedules.reduce(
      (acc, schedule) => acc + BigInt(schedule.locked),
      0n,
    );

    vestingSummary.numSchedules += numSchedules;
    vestingSummary.numActiveSchedules += numActiveSchedules;
    vestingSummary.lockedAmount += lockedAmount;

    if (accounts.has(account)) {
      const accountSummary = {
        account,
        numSchedules,
        numActiveSchedules,
        lockedAmount,
        indexer,
      };
      accountSummaryList.push(accountSummary);
    }
  }

  return [vestingSummary, accountSummaryList];
}

async function findChangedAccounts(events) {
  const accounts = new Set();
  for (const event of events) {
    if (
      event.event.type === "VestingUpdated" ||
      event.event.type === "VestingCompleted"
    ) {
      accounts.add(event.event.account);
    }
  }

  return accounts;
}

async function fetchAllVestings(api) {
  return await api.query.vesting.vesting.entries();
}

module.exports = {
  generateVestingSummary,
};
