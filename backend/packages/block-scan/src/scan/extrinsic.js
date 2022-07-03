const {
  utils: { extractExtrinsicEvents, isExtrinsicSuccess },
  call: { normalizeCall },
} = require("@osn/scan-common");

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
  return [
    mortal.birth(indexer.blockHeight),
    mortal.death(indexer.blockHeight),
  ]
}

function normalizeExtrinsic(extrinsic, events, indexer) {
  const hash = extrinsic.hash.toHex();
  const nonce = extrinsic.nonce.toNumber();
  const tip = extrinsic.tip.toBigInt().toString();
  const version = extrinsic.version;
  const isSuccess = isExtrinsicSuccess(events);
  const call = normalizeCall(extrinsic.method);

  const listIgnore = ignoreInExtrinsicList(extrinsic.method);
  const isSigned = extrinsic.isSigned;
  const signer = isSigned ? extrinsic.signer.toString() : "";
  const signature = isSigned ? extrinsic.signature.toString() : "";
  const lifetime = getLifetime(extrinsic, indexer);

  return {
    indexer,
    hash,
    isSuccess,
    ...call,
    nonce,
    tip,
    version,
    isSigned,
    signer,
    signature,
    lifetime,
    listIgnore,
  }
}

function normalizeExtrinsics(extrinsics = [], blockEvents = [], blockIndexer) {
  let index = 0;
  let normalizedExtrinsics = [];
  for (const extrinsic of extrinsics) {
    const events = extractExtrinsicEvents(blockEvents, index);
    const extrinsicIndexer = { ...blockIndexer, extrinsicIndex: index++ };

    const normalized = normalizeExtrinsic(extrinsic, events, extrinsicIndexer);
    normalizedExtrinsics.push(normalized);
  }

  return normalizedExtrinsics;
}

module.exports = {
  normalizeExtrinsics,
}
