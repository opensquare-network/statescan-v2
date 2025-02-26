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

function getDispatchError(dispatchError) {
  if (dispatchError.isModule) {
    try {
      const mod = dispatchError.asModule;
      const error = dispatchError.registry.findMetaError(mod);

      return {
        type: error.section,
        code: error.method,
        message: error.docs?.join(" "),
      };
    } catch (error) {
      // swallow
    }
  } else if (dispatchError.isToken) {
    return {
      type: dispatchError.type,
      code: dispatchError.asToken.type,
      message: "",
    };
  }

  return {
    type: dispatchError.type,
    code: "",
    message: "",
  };
}

function extractExtrinsicError(events) {
  const failedEvent = events.find(
    (e) => e.event.section === "system" && e.event.method === "ExtrinsicFailed",
  );
  if (failedEvent) {
    const [dispatchError] = failedEvent.event.data;
    return getDispatchError(dispatchError);
  }

  const proxyExecutedEvent = events.find(
    (e) => e.event.section === "proxy" && e.event.method === "ProxyExecuted",
  );
  if (proxyExecutedEvent) {
    const [result] = proxyExecutedEvent.event.data;
    if (result.isErr) {
      return getDispatchError(result.asErr);
    }
  }

  return null;
}

function normalizeExtrinsic(extrinsic, events, indexer) {
  let hash = extrinsic.hash.toHex();
  if (["gargantua", "nexus"].includes(process.env.CHAIN)) {
    hash = keccakAsHex(extrinsic.toU8a(), 256);
  }
  const version = extrinsic.version;
  const isSuccess = isExtrinsicSuccess(events);
  let error = null;
  if (!isSuccess) {
    error = extractExtrinsicError(events);
  }
  const call = normalizeCall(extrinsic.method);

  const isSigned = extrinsic.isSigned;
  let obj = {
    indexer,
    version,
    hash,
    isSuccess,
    call,
    isSigned,
    error,
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
