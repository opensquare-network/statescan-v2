const { handleNewMultisig } = require("./newMultisig");

async function handleMultisigEvents(event, indexer, extrinsic) {
  const { section, method } = event;
  if ("multisig" !== section) {
    return;
  }

  if ("NewMultisig" === method) {
    await handleNewMultisig(event, indexer, extrinsic);
  } else if ("MultisigApproval" === method) {
  } else if ("MultisigExecuted" === method) {
  } else if ("MultisigCancelled" === method) {
  }
}

module.exports = {
  handleMultisigEvents,
};
