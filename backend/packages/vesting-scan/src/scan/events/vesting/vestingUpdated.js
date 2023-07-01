const {
  SECTION: { VESTING },
  EVENT_METHOD: { VESTING_UPDATED },
} = require("../../constants");
const { setAccount, addAccountTimeline } = require("../../../store/account");

async function handleVestingUpdated(event, indexer) {
  const { section, method } = event;
  if (section != VESTING || method != VESTING_UPDATED) {
    return;
  }

  const account = event.data[0].toString();
  const locked = BigInt(event.data[1].toString());
  setAccount(account, {
    account: account,
    locked: locked,
  });

  addAccountTimeline({
    indexer: indexer,
    account: account,
    locked: locked,
  });
}

module.exports = {
  handleVestingUpdated,
};
