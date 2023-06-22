// acccount to new vesting lists

let changedAccounts = [];
let vestings = {};
let endedVestings = {};

function getVestingsOf(account) {
  return vestings[account];
}

function setVestingsOf(account, vesting) {
  vestings[account] = vesting;
}

function getRemovedVestings() {
  return endedVestings;
}

function addRemovedVestings(account, vestings) {
  const allVestings = endedVestings[account] || [];
  allVestings.push(...vestings);
  endedVestings[account] = allVestings;
}

function clearRemovedVestings() {
  endedVestings = {};
}

function addChangedAccount(account) {
  changedAccounts.push(account);
}

function getChangedAccounts() {
  return changedAccounts;
}

function clearChangedAccounts() {
  changedAccounts = [];
}

module.exports = {
  getVestingsOf,
  getRemovedVestings,
  addRemovedVestings,
  clearRemovedVestings,
  setVestingsOf,
  addChangedAccount,
  getChangedAccounts,
  clearChangedAccounts,
};
