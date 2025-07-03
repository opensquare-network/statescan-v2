const {
  chain: { findBlockApi },
} = require("@osn/scan-common");
const {
  utils: { isValidAddress, isNum },
} = require("@statescan/common");
const { handleRewardWithAccountAndBalance } = require("./accountAndBalance");

async function handleReward(event, indexer) {
  const data = event.data;
  if (data.length === 1) {
    // todo: handle only one data case
  } else if (data.length !== 2) {
    throw new Error(`Unknown staking#reward case with not 2 data args`);
  }

  const arg1 = data[0].toString();
  const arg2 = data[1].toString();
  if (isValidAddress(arg1) && isNum(arg2)) {
    await handleRewardWithAccountAndBalance(event, indexer);
  }
  // todo: case 1(AccountId, balance) -> done
}

module.exports = {
  handleReward,
};
