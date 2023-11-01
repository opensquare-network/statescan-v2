const {
  utils: { isExtrinsicSuccess },
  call: { normalizeCall },
} = require("@osn/scan-common");

function normalizeInSimpleMode(extrinsic, events, indexer) {
  const isSuccess = isExtrinsicSuccess(events);
  const call = normalizeCall(extrinsic.method);
  const isSigned = extrinsic.isSigned;

  let obj = {
    indexer,
    isSuccess,
    section: call?.section,
    method: call?.method,
    eventsCount: events.length,
    isSigned,
  };

  if (isSigned) {
    const signer = extrinsic.signer.toString();
    Object.assign(obj, { signer });
    obj = {
      ...obj,
      signer,
    };
  }

  return obj;
}

module.exports = {
  normalizeInSimpleMode,
};
