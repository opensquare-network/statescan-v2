const {
  utils: { isExtrinsicSuccess },
  call: { normalizeCall },
  env: { currentChain },
} = require("@osn/scan-common");
const {
  utils: { getExtrinsicHash },
} = require("@statescan/common");
const { resolveExtrinsic } = require("./general");

function normalizeInSimpleMode(extrinsic, events, indexer) {
  const isSuccess = isExtrinsicSuccess(events);
  const call = normalizeCall(extrinsic.method);
  const { isGeneral, isSigned, signer } = resolveExtrinsic(extrinsic);
  const hash = getExtrinsicHash(extrinsic, currentChain());

  let obj = {
    indexer,
    isSuccess,
    hash,
    section: call?.section,
    method: call?.method,
    args: call?.args,
    eventsCount: events.length,
    isSigned,
  };

  if (isSigned) {
    Object.assign(obj, {
      signer: isGeneral ? signer : extrinsic.signer.toString(),
    });
  }

  return obj;
}

module.exports = {
  normalizeInSimpleMode,
};
