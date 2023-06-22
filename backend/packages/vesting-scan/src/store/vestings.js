// acccount to new vesting lists

let previousVestings = {};
let vestings = {};
let endedVestings = {};

function getPreviousVestings(account) {
  const vestings = previousVestings[account];
  if (vestings === undefined) {
    return undefined;
  }
  return vestings.map((vesting) => {
    return {
      ...vesting,
    };
  });
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

function getEndedVestings() {
  return endedVestings;
}

function addEndedVestings(account, vestings) {
  const allVestings = endedVestings[account] || [];
  allVestings.push(vestings);
  endedVestings[account] = allVestings;
}

module.exports = {
  getPreviousVestings,
  setPreviousVestings,
  getCurrentVestings,
  setCurrentVestings,
  addEndedVestings,
};
