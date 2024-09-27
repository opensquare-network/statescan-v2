const { GenericCall } = require("@polkadot/types");
const {
  consts: {
    Modules,
    ProxyMethods,
    MultisigMethods,
    UtilityMethods,
    SudoMethods,
  },
  utils: { emptyFn, calcMultisigAddress },
  logger,
} = require("@osn/scan-common");
const { getBlockApiConditionally } = require("../../common/api");

let _callHandler;

async function unwrapProxy(call, signer, extrinsicIndexer) {
  const real = call.args[0].toString();
  const innerCall = call.args[2];
  await handleWrappedCall(innerCall, real, extrinsicIndexer);
}

async function unwrapProxyAnnounced(call, signer, extrinsicIndexer) {
  const real = call.args[1].toString();
  const innerCall = call.args[3];
  await handleWrappedCall(innerCall, real, extrinsicIndexer);
}

async function handleMultisig(call, signer, extrinsicIndexer) {
  const blockApi = await getBlockApiConditionally(extrinsicIndexer.blockHash);
  const callHex = call.args[3];
  const threshold = call.args[0].toNumber();
  const otherSignatories = call.args[1].toJSON();
  const multisigAddr = calcMultisigAddress(
    [signer, ...otherSignatories],
    threshold,
    blockApi.registry.chainSS58,
  );

  let innerCall;
  try {
    innerCall = new GenericCall(blockApi.registry, callHex);
  } catch (e) {
    logger.error(`error when parse multiSig`, extrinsicIndexer);
    return;
  }

  await handleWrappedCall(innerCall, multisigAddr, extrinsicIndexer);
}

async function unwrapBatch(call, signer, extrinsicIndexer) {
  const innerCalls = call.args[0];
  for (let index = 0; index < innerCalls.length; index++) {
    await handleWrappedCall(innerCalls[index], signer, extrinsicIndexer);
  }
}

async function unwrapSudo(call, signer, extrinsicIndexer) {
  const { method } = call;

  const isSudoAs = SudoMethods.sudoAs === method;
  const targetCall = isSudoAs ? call.args[1] : call.args[0];
  const author = isSudoAs ? call.args[0].toString() : signer;
  await handleWrappedCall(targetCall, author, extrinsicIndexer);
}

async function handleWrappedCall(call, signer, extrinsicIndexer) {
  const { section, method } = call;
  if (Modules.Proxy === section && ProxyMethods.proxy === method) {
    await unwrapProxy(...arguments);
  } else if (Modules.Proxy === section && "proxyAnnounced" === method) {
    await unwrapProxyAnnounced(...arguments);
  } else if (
    [Modules.Multisig, Modules.Utility].includes(section) &&
    MultisigMethods.asMulti === method
  ) {
    await handleMultisig(...arguments);
  } else if (
    Modules.Utility === section &&
    [
      UtilityMethods.batch,
      UtilityMethods.batchAll,
      UtilityMethods.forceBatch,
    ].includes(method)
  ) {
    await unwrapBatch(...arguments);
  } else if (
    Modules.Sudo === section &&
    [SudoMethods.sudo, SudoMethods.sudoAs].includes(method)
  ) {
    await unwrapSudo(...arguments);
  }

  if (_callHandler) {
    await _callHandler(...arguments);
  }
}

async function handlePureNestedCalls(
  extrinsic,
  extrinsicIndexer,
  callHandler = emptyFn,
) {
  const signer = extrinsic.signer.toString();
  const call = extrinsic.method;

  _callHandler = callHandler;
  await handleWrappedCall(call, signer, extrinsicIndexer);
}

module.exports = {
  handlePureNestedCalls,
};
