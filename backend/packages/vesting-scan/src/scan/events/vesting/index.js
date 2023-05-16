async function handleVestingEvents(
  event,
  indexer,
  extrinsic,
  blockEvents = [],
) {
  const { section, method } = event;
  if ("vesting" === section) {
    return;
  }

  // todo: handle various vesting events, extract business data and save it to DB
}

module.exports = {
  handleVestingEvents,
};
