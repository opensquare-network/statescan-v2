const { handleBurned } = require("./burned");
const { handleIssued } = require("./issued");

async function handleInstanceEvent(event, indexer, extrinsic, events) {
  const { section, method } = event;
  if ("uniques" !== section) {
    return;
  }

  if ("Issued" === method) {
    await handleIssued(event, indexer, events);
  } else if ("Burned" === method) {
    await handleBurned(event, indexer);
  }
}

module.exports = {
  handleInstanceEvent,
};
