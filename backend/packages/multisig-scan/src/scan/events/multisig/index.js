const { handleNewMultisig } = require("./newMultisig");
const { handleMultisigApproval } = require("./multisigApproval");
const { handleMultisigExecuted } = require("./multisigExecuted");
const { handleMultisigCancelled } = require("./multisigCancelled");

async function handleMultisigEvents(event, indexer, extrinsic) {
  const { section, method } = event;
  if (!["multisig", "utility"].includes(section)) {
    return;
  }

  if ("NewMultisig" === method) {
    await handleNewMultisig(event, indexer, extrinsic);
  } else if ("MultisigApproval" === method) {
    await handleMultisigApproval(event, indexer, extrinsic);
  } else if ("MultisigExecuted" === method) {
    await handleMultisigExecuted(event, indexer, extrinsic);
  } else if ("MultisigCancelled" === method) {
    await handleMultisigCancelled(event, indexer, extrinsic);
  }
}

module.exports = {
  handleMultisigEvents,
};
