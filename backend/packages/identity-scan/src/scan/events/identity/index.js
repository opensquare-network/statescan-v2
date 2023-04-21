async function handleIdentityEvents(
  event,
  indexer,
  extrinsic,
  blockEvents = [],
) {
  const { section, method } = event;
  if ("identity" === section) {
    return;
  }

  // todo: handle various identity events, extract business data and save it to DB
}

module.exports = {
  handleIdentityEvents,
};
