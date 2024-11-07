const {
  utils: { isExtrinsicSuccess },
  call: { normalizeCall },
  env: { currentChain },
} = require("@osn/scan-common");
const {
  utils: { getExtrinsicHash },
} = require("@statescan/common");

function ignoreInExtrinsicList(call) {
  const { section, method } = call;
  return (
    (section === "parachainSystem" && method === "setValidationData") ||
    (section === "timestamp" && method === "set")
  );
}

function getLifetime(extrinsic, indexer) {
  if (!extrinsic.era.isMortalEra) {
    return null;
  }

  const mortal = extrinsic.era.asMortalEra;
  return [mortal.birth(indexer.blockHeight), mortal.death(indexer.blockHeight)];
}

function normalizeExtrinsic(extrinsic, events, indexer) {
  const hash = getExtrinsicHash(extrinsic, currentChain());
  const version = extrinsic.version;
  const isSuccess = isExtrinsicSuccess(events);
  const call = normalizeCall(extrinsic.method);

  const listIgnore = ignoreInExtrinsicList(extrinsic.method);
  const isSigned = extrinsic.isSigned;
  let obj = {
    indexer,
    version,
    hash,
    isSuccess,
    call,
    eventsCount: events.length,
    isSigned,
    listIgnore,
  };

  if (isSigned) {
    const tip = extrinsic.tip ? extrinsic.tip.toBigInt().toString() : "0";
    const nonce = extrinsic.nonce.toNumber();
    const signer = extrinsic.signer.toString();
    const signature = extrinsic.signature.toString();
    const lifetime = getLifetime(extrinsic, indexer);

    obj = {
      ...obj,
      nonce,
      signer,
      signature,
      tip,
      lifetime,
    };
  }

  return obj;
}

module.exports = {
  normalizeExtrinsic,
};
