const {
  utils: { extractExtrinsicEvents, isExtrinsicSuccess },
  extrinsic: { handlePureNestedCalls },
  chain: { getExtrinsicSigner },
} = require("@osn/scan-common");
const { getReviveSection } = require("../common/section");
const { handleCall } = require("./calls/call");
const { handleEthCall } = require("./calls/ethCall");
const { handleEthTransact } = require("./calls/ethTransact");

async function handleReviveCall(call, signer, extrinsicIndexer, isSuccess) {
  await handleCall(call, signer, extrinsicIndexer, isSuccess);
  await handleEthCall(call, signer, extrinsicIndexer, isSuccess);
}

function isGeneralExtrinsic(extrinsic) {
  return typeof extrinsic.isGeneral === "function" && extrinsic.isGeneral();
}

// An unsigned extrinsic has no origin of its own, reading its signer yields the zero
// address, e.g. for the ethTransact ones handled separately.
function getOrigin(extrinsic) {
  if (!isGeneralExtrinsic(extrinsic) && !extrinsic.isSigned) {
    return null;
  }

  return getExtrinsicSigner(extrinsic) || null;
}

// Only the contract calls are indexed here. A contract deployment is indexed from the
// `revive.Instantiated` event instead, see ../events/revive/events/instantiated.js,
// because the address a creation call deploys is only known from that event.
async function handleExtrinsics(extrinsics = [], allEvents = [], indexer) {
  let index = 0;

  for (const extrinsic of extrinsics) {
    const events = extractExtrinsicEvents(allEvents, index);
    const extrinsicIndexer = { ...indexer, extrinsicIndex: index++ };
    const isSuccess = isExtrinsicSuccess(events);
    const { section, method } = extrinsic.method;

    if (section === getReviveSection() && "ethTransact" === method) {
      await handleEthTransact(extrinsic, extrinsicIndexer, isSuccess);
      continue;
    }

    const origin = getOrigin(extrinsic);
    if (!origin) {
      continue;
    }

    // Walk into the calls wrapped by utility.batch, multisig, proxy and so on, so a
    // nested revive.call is indexed with the account which really made it.
    await handlePureNestedCalls(
      extrinsic,
      extrinsicIndexer,
      (call, signer, callIndexer) =>
        handleReviveCall(call, signer, callIndexer, isSuccess),
    );
  }
}

module.exports = {
  handleExtrinsics,
};
