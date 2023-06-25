const { setAccount, addAccountTimeline } = require("../../../store/account");

async function handleVestingEvents(
  event,
  indexer,
  extrinsic,
  blockEvents = [],
) {
  const { section, method } = event;
  if ("vesting" !== section) {
    return;
  }

  let accountTimelineIndexer = {
    blockHeight: indexer.blockHeight,
    extrinsicIndex: indexer.extrinsicIndex,
    eventIndex: indexer.eventIndex,
  };

  if ("VestingUpdated" === method) {
    const account = event.data[0].toString();
    const locked = BigInt(event.data[1].toString());
    setAccount(account, {
      account: account,
      locked: locked,
    });

    addAccountTimeline({
      indexer: accountTimelineIndexer,
      account: account,
      locked: locked,
    });
  }

  if ("VestingCompleted" === method) {
    const account = event.data[0].toString();

    setAccount(account, {
      account: account,
      locked: BigInt(0),
    });

    addAccountTimeline({
      indexer: accountTimelineIndexer,
      account: account,
      locked: BigInt(0),
    });
  }
}

module.exports = {
  handleVestingEvents,
};
