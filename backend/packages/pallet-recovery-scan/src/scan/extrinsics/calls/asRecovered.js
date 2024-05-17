const { getRecoverySection } = require("../../common/section");
const {
  palletRecovery: { getActiveRecoverableOrThrow, getRecoveredCallCol },
} = require("@statescan/mongo");
const {
  call: { normalizeCall },
} = require("@osn/scan-common");

async function handleAsRecovered(call, signer, extrinsicIndexer) {
  const { section, method } = call;
  if (getRecoverySection() !== section || "asRecovered" !== method) {
    return;
  }

  const lostAccount = call.args[0].toString();
  const recoverable = await getActiveRecoverableOrThrow(
    lostAccount,
    extrinsicIndexer.blockHeight,
  );

  const recoveredCall = call.args[1];

  const col = await getRecoveredCallCol();
  await col.insertOne({
    recoverableHeight: recoverable.height,
    lostAccount,
    rescuer: recoverable.rescuer,
    call: normalizeCall(recoveredCall),
    callHex: recoveredCall.toHex(),
    indexer: extrinsicIndexer,
  });
}

module.exports = {
  handleAsRecovered,
};
