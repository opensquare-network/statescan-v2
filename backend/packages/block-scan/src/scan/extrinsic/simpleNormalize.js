const {
  utils: { isExtrinsicSuccess },
  call: { normalizeCall },
} = require("@osn/scan-common");
const { getExtrinsicHash } = require("../utils/hash");

function normalizeInSimpleMode(extrinsic, events, indexer) {
  const isSuccess = isExtrinsicSuccess(events);
  const call = normalizeCall(extrinsic.method);
  const isSigned = extrinsic.isSigned;
  const hash = getExtrinsicHash(extrinsic);

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
    const signer = extrinsic.signer.toString();
    Object.assign(obj, { signer });
  }

  return obj;
}

module.exports = {
  normalizeInSimpleMode,
};
