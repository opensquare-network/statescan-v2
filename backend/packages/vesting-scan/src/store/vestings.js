// acccount to new vesting lists

let previousVestings = {};
let vestings = {};

function getPreviousVestings(account) {
  const vestings = previousVestings[account];
  if (vestings === undefined) {
    return undefined;
  }
  return JSON.parse(JSON.stringify(vestings));
}

function setPreviousVestings(account, vesting) {
  previousVestings[account] = vesting;
}

function getCurrentVestings(account) {
  return vestings[account];
}

function setCurrentVestings(account, vesting) {
  vestings[account] = vesting;
}

module.exports = {
  getPreviousVestings,
  setPreviousVestings,
  getCurrentVestings,
  setCurrentVestings,
};
