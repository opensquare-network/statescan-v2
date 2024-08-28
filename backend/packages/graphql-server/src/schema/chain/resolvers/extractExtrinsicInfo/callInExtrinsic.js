const { WrappedEvents } = require("@osn/scan-common/src/type/wrappedEvents");
const {
  isSudoOk,
  getSudoInnerCallEvents,
} = require("@osn/scan-common/src/extrinsic/utils/sudo");
const {
  getBatchInnerCallEvents,
} = require("@osn/scan-common/src/extrinsic/utils/batch");
const {
  findInterrupted,
} = require("@osn/scan-common/src/extrinsic/utils/checkInterrupted");
const {
  isMultisigExecutedOk,
  getMultisigInnerCallEvents,
} = require("@osn/scan-common/src/extrinsic/utils/multisig");
const { calcMultisigAddress } = require("@osn/scan-common/src/utils/multisig");
const {
  getProxyInnerCallEvents,
} = require("@osn/scan-common/src/extrinsic/utils/getProxyCallEvents");
const {
  isProxyExecutedOk,
} = require("@osn/scan-common/src/extrinsic/utils/isProxyExecutedOk");
const {
  Modules,
  ProxyMethods,
  MultisigMethods,
  UtilityMethods,
  SudoMethods,
} = require("@osn/scan-common/src/consts");
const { GenericCall } = require("@polkadot/types");

async function unwrapProxy(
  api,
  call,
  signer,
  extrinsicIndexer,
  wrappedEvents,
  callHandler,
) {
  if (!isProxyExecutedOk(wrappedEvents?.events)) {
    return;
  }

  const innerCallEvents = getProxyInnerCallEvents(wrappedEvents);
  const real = call.args[0].toString();
  const innerCall = call.args[2];
  await handleWrappedCall(
    api,
    innerCall,
    real,
    extrinsicIndexer,
    innerCallEvents,
    callHandler,
  );
}

async function handleMultisig(
  api,
  call,
  signer,
  extrinsicIndexer,
  wrappedEvents,
  callHandler,
) {
  if (!isMultisigExecutedOk(wrappedEvents.events)) {
    return;
  }

  const blockApi = await api.at(extrinsicIndexer.blockHash);
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
    // logger.error(`error when parse multiSig`, extrinsicIndexer);
    return;
  }

  const innerCallEvents = getMultisigInnerCallEvents(wrappedEvents);
  await handleWrappedCall(
    api,
    innerCall,
    multisigAddr,
    extrinsicIndexer,
    innerCallEvents,
    callHandler,
  );
}

async function unwrapBatch(
  api,
  call,
  signer,
  extrinsicIndexer,
  wrappedEvents,
  callHandler,
) {
  const method = call.method;
  const interruptedEvent = findInterrupted(wrappedEvents);

  if (UtilityMethods.batchAll === method && interruptedEvent) {
    return;
  }

  let endIndex = call.args[0].length;
  if (interruptedEvent) {
    endIndex = interruptedEvent.event?.data[0].toNumber();
  }

  const innerCalls = call.args[0];
  for (let index = 0; index < endIndex; index++) {
    const innerCallEvents = getBatchInnerCallEvents(wrappedEvents, index);
    await handleWrappedCall(
      api,
      innerCalls[index],
      signer,
      extrinsicIndexer,
      innerCallEvents,
      callHandler,
    );
  }
}

async function unwrapSudo(
  api,
  call,
  signer,
  extrinsicIndexer,
  wrappedEvents,
  callHandler,
) {
  const { method } = call;
  if (!isSudoOk(wrappedEvents.events, method)) {
    return;
  }

  const isSudoAs = SudoMethods.sudoAs === method;
  const targetCall = isSudoAs ? call.args[1] : call.args[0];
  const author = isSudoAs ? call.args[0].toString() : signer;
  const innerCallEvents = getSudoInnerCallEvents(wrappedEvents, method);
  await handleWrappedCall(
    api,
    targetCall,
    author,
    extrinsicIndexer,
    innerCallEvents,
    callHandler,
  );
}

async function handleWrappedCall() {
  const call = arguments[1];
  const callHandler = arguments[5];
  const { section, method } = call;

  if (Modules.Proxy === section && ProxyMethods.proxy === method) {
    await unwrapProxy(...arguments);
  } else if (
    Modules.Multisig === section &&
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

  if (callHandler) {
    await callHandler(...arguments);
  }
}

async function handleCallsInExtrinsic(
  api,
  extrinsic,
  events,
  extrinsicIndexer,
  callHandler = () => {},
) {
  const wrappedEvents = new WrappedEvents(events, 0, false);
  const signer = extrinsic.signer.toString();
  const call = extrinsic.method;

  await handleWrappedCall(
    api,
    call,
    signer,
    extrinsicIndexer,
    wrappedEvents,
    callHandler,
  );
}

module.exports = {
  handleCallsInExtrinsic,
};
