const {
  chain: { findBlockApi },
  call,
} = require("@osn/scan-common");

const { getVestingEvents } = require("../store/event");
const { getVestingCalls } = require("../store/call");

async function generateVestingSummary(indexer) {
  const events = getVestingEvents(indexer);
  // For some blocks, events are not emitted.
  // For example, in block 8730807, there is a mergeSchedules call but without any events.
  const calls = getVestingCalls(indexer);
  const accounts = await findChangedAccounts(events, calls);
  if (accounts.length <= 0) {
    return;
  }

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

async function findChangedAccounts(events, calls) {
  const accounts = new Set();
  for (const event of events) {
    if (
      event.event.type === "VestingUpdated" ||
      event.event.type === "VestingCompleted"
    ) {
      accounts.add(event.event.account);
    }
  }

  for (const call of calls) {
    if (call.call.type === "mergeSchedules") {
      accounts.add(call.signedBy);
    }
    if (call.call.type === "vest") {
      accounts.add(call.call.target);
    }
    if (call.call.type === "vestedTransfer") {
      accounts.add(call.call.source, call.call.target);
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
