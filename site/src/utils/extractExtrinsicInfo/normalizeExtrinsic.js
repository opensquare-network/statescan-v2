import { normalizeCall } from "./normalizeCall";
import { keccakAsHex, blake2AsHex } from "@polkadot/util-crypto";
// subpath import: the package index pulls in the scan side (mongo, log4js) as well
import { getExtrinsicSigner } from "@osn/scan-common/src/chain/decodeExtrinsic";

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
  let hash;
  try {
    hash = extrinsic.hash.toHex();
  } catch (e) {
    hash = blake2AsHex(extrinsic.toU8a(), 256);
  }
  if (["gargantua", "nexus"].includes(process.env.REACT_APP_PUBLIC_CHAIN)) {
    hash = keccakAsHex(extrinsic.toU8a(), 256);
  }
  const version = extrinsic.version;
  const isSuccess = isExtrinsicSuccess(events);
  const call = normalizeCall(extrinsic.method);

  // a general transaction is authorized by its transaction extensions, so polkadot.js
  // reports it as not signed and throws when `signer` or `signature` is read
  const isGeneral =
    typeof extrinsic.isGeneral === "function" && extrinsic.isGeneral();
  const generalSigner = isGeneral ? getExtrinsicSigner(extrinsic) : undefined;
  const isSigned = isGeneral ? !!generalSigner : extrinsic.isSigned;
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
    const lifetime = getLifetime(extrinsic, indexer);

    obj = {
      ...obj,
      nonce,
      signer: isGeneral ? generalSigner : extrinsic.signer.toString(),
      ...(isGeneral ? {} : { signature: extrinsic.signature.toString() }),
      tip,
      lifetime,
    };
  }

  return obj;
}
