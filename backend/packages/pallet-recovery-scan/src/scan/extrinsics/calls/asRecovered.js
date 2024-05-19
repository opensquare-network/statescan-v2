const { getRecoverySection } = require("../../common/section");
const {
  palletRecovery: { getRecoveredCallCol, getLatestRecoverable },
} = require("@statescan/mongo");
const {
  call: { normalizeCall },
} = require("@osn/scan-common");
const {
  store: { setKnownHeightMark },
} = require("@statescan/common");

async function handleAsRecovered(call, signer, extrinsicIndexer) {
  const { section, method } = call;
  if (getRecoverySection() !== section || "asRecovered" !== method) {
    return;
  }

  setKnownHeightMark(extrinsicIndexer.blockHeight);

  const lostAccount = call.args[0].toString();
  const recoverable = await getLatestRecoverable(lostAccount);
  const recoveredCall = call.args[1];

  const col = await getRecoveredCallCol();
  await col.insertOne({
    recoverableHeight: recoverable?.height,
    lostAccount,
    rescuer: recoverable?.rescuer || signer,
    call: normalizeCall(recoveredCall),
    callHex: recoveredCall.toHex(),
    indexer: extrinsicIndexer,
  });
}

module.exports = {
  handleAsRecovered,
};
