const {
  getVestingsOf,
  getRemovedVestings,
  clearRemovedVestings,
  getChangedAccounts,
  clearChangedAccounts,
} = require("../store/vestings");

function handleVestingsChange(blockIndexer, parentHash) {
  const changedAccounts = getChangedAccounts();

  for (const account of changedAccounts) {
    const vestings = getVestingsOf(account);
    for (let i = 0; i < vestings.length; i++) {
      const vesting = vestings[i];
      if (vesting.index === undefined) {
        console.log("new vesting", account, i, vesting);
        vesting.index = i;
      } else if (vesting.index != i) {
        console.log("vesting index changed", account, i);
      }
    }
  }

  const removedVestings = getRemovedVestings();
  for (const [account, vestings] of Object.entries(removedVestings)) {
    console.log("ended vesting", account, vestings);
  }

  clearRemovedVestings();
  clearChangedAccounts();
}

module.exports = {
  handleVestingsChange,
};
