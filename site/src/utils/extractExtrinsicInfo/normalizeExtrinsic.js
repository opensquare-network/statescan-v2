import { normalizeCall } from "./normalizeCall";

function getLifetime(extrinsic, indexer) {
  if (!extrinsic.era.isMortalEra) {
    return null;
  }

  const mortal = extrinsic.era.asMortalEra;
  return [mortal.birth(indexer.blockHeight), mortal.death(indexer.blockHeight)];
}

function isExtrinsicSuccess(events) {
  return events.some((e) => e.event.method === "ExtrinsicSuccess");
}

export function normalizeExtrinsic(extrinsic, events, indexer) {
  const hash = extrinsic.hash.toHex();
  const version = extrinsic.version;
  const isSuccess = isExtrinsicSuccess(events);
  const call = normalizeCall(extrinsic.method);

  const isSigned = extrinsic.isSigned;
  let obj = {
    indexer,
    version,
    hash,
    isSuccess,
    call,
    isSigned,
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
