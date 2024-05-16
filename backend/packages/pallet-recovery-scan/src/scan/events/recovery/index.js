const {
  store: { setKnownHeightMark },
} = require("@statescan/common");
const { getRecoverySection } = require("../../common/section");
const { handleRecoveryCreated, handleRecoveryRemoved } = require("./events");

async function handleRecoveryEvent(event, indexer) {
  const { section, method } = event;
  if (section !== getRecoverySection()) {
    return;
  }
  setKnownHeightMark(indexer.blockHeight);

  if (method === "RecoveryCreated") {
    await handleRecoveryCreated(event, indexer);
  } else if (method === "RecoveryRemoved") {
    await handleRecoveryRemoved(event, indexer);
  } else if (method === "RecoveryInitiated") {
  }
}

module.exports = {
  handleRecoveryEvent,
};
