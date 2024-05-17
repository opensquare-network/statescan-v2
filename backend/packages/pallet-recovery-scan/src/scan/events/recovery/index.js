const {
  store: { setKnownHeightMark },
} = require("@statescan/common");
const { getRecoverySection } = require("../../common/section");
const {
  handleRecoveryCreated,
  handleRecoveryRemoved,
  handleRecoveryInitiated,
  handleRecoveryVouched,
  handleAccountRecovered,
  handleRecoveryClosed,
} = require("./events");

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
    await handleRecoveryInitiated(event, indexer);
  } else if (method === "RecoveryVouched") {
    await handleRecoveryVouched(event, indexer);
  } else if (method === "AccountRecovered") {
    await handleAccountRecovered(event, indexer);
  } else if (method === "RecoveryClosed") {
    await handleRecoveryClosed(event, indexer);
  }
}

module.exports = {
  handleRecoveryEvent,
};
