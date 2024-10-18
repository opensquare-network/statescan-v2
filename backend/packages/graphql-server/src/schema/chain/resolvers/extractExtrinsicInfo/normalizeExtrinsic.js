const { keccakAsHex } = require("@polkadot/util-crypto");
const { normalizeCall } = require("@osn/scan-common");
const {
  utils: { isExtrinsicSuccess },
} = require("@osn/scan-common");

function getLifetime(extrinsic, indexer) {
  if (!extrinsic.era.isMortalEra) {
    return null;
  }

  const mortal = extrinsic.era.asMortalEra;
  return [mortal.birth(indexer.blockHeight), mortal.death(indexer.blockHeight)];
}

function normalizeExtrinsic(extrinsic, events, indexer) {
  let hash = extrinsic.hash.toHex();
  if (["gargantua", "nexus"].includes(process.env.CHAIN)) {
    hash = keccakAsHex(extrinsic.toU8a(), 256);
  }
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

module.exports = {
  normalizeExtrinsic,
};
