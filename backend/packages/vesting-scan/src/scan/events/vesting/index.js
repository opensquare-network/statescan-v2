const { handleVestingUpdated } = require("./vestingUpdated");
const { handleVestingCompleted } = require("./vestingCompleted");
const {
  env: { currentChain },
} = require("@osn/scan-common");

const chainSections = {};

function getSection() {
  return chainSections[currentChain()] || "vesting";
}

async function handleVestingEvents(event, indexer) {
  const { section, method } = event;
  if (section !== getSection()) {
    return;
  }

  if (method === "VestingUpdated") {
    await handleVestingUpdated(event, indexer);
  } else if (method === "VestingCompleted") {
    await handleVestingCompleted(event, indexer);
  }
}

module.exports = {
  handleVestingEvents,
};
