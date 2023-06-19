// acccount to new vesting lists
let newVestings = {};

function addNewVestings(account, vesting) {
  if (!newVestings[account]) {
    newVestings[account] = [];
  }
  newVestings[account].push(vesting);
}

function getNewVestings() {
  return newVestings;
}

function clearNewVestings() {
  newVestings = {};
}

module.exports = {
  addNewVestings,
  getNewVestings,
  clearNewVestings,
};
