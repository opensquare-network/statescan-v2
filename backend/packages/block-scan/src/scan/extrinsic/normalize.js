const {
  utils: { isExtrinsicSuccess },
  call: { normalizeCall },
  env: { currentChain },
} = require("@osn/scan-common");
const {
  utils: { getExtrinsicHash },
} = require("@statescan/common");
const { resolveExtrinsic } = require("./general");

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
  const { isGeneral, isSigned, signer } = resolveExtrinsic(extrinsic);
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
    const lifetime = getLifetime(extrinsic, indexer);

    obj = {
      ...obj,
      nonce,
      signer: isGeneral ? signer : extrinsic.signer.toString(),
      // a general transaction has no top level signature, and the one carried by its
      // extensions is not what the `signature` field is about
      ...(isGeneral ? {} : { signature: extrinsic.signature.toString() }),
      tip,
      lifetime,
    };
  }

  return obj;
}

module.exports = {
  normalizeExtrinsic,
};
