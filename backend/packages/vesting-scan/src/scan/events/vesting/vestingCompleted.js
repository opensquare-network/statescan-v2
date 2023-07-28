const {
  SECTION: { VESTING },
  EVENT_METHOD: { VESTING_COMPLETED },
} = require("../../constants");
const { setAccount, addAccountTimeline } = require("../../../store/account");

async function handleVestingCompleted(event, indexer) {
  const { section, method } = event;
  if (section !== VESTING || method !== VESTING_COMPLETED) {
    return;
  }

  const account = event.data[0].toString();

  setAccount(account, {
    account: account,
    locked: BigInt(0),
  });

  addAccountTimeline({
    indexer: indexer,
    account: account,
    locked: BigInt(0),
  });
}

module.exports = {
  handleVestingCompleted,
};
