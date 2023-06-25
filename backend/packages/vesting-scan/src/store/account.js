let accounts = {};
let accountTimelines = [];

function getAccounts() {
  return Object.values(accounts);
}

function getAccountTimelines() {
  return accountTimelines;
}

function setAccount(account, accountInfo) {
  accounts[account] = accountInfo;
}

function addAccountTimeline(timeline) {
  accountTimelines.push(timeline);
}

function clearAccounts() {
  accounts = {};
  accountTimelines = [];
}

module.exports = {
  getAccounts,
  getAccountTimelines,
  setAccount,
  addAccountTimeline,
  clearAccounts,
};
