import { WrappedEvents } from "./type/wrappedEvents";
import { isSudoOk, getSudoInnerCallEvents } from "./utils/sudo";
import {
  isMultisigExecutedOk,
  getMultisigInnerCallEvents,
} from "./utils/multisig";
import { calcMultisigAddress } from "./utils/multisig";
import { getProxyInnerCallEvents } from "./utils/getProxyCallEvents";
import { isProxyExecutedOk } from "./utils/isProxyExecutedOk";
import {
  Modules,
  ProxyMethods,
  MultisigMethods,
  UtilityMethods,
  SudoMethods,
  UtilityEvents,
} from "./consts";
import { GenericCall } from "@polkadot/types";

function findBatchItemEventIndex(events = [], from = 0) {
  return events.findIndex(({ event }, index) => {
    return (
      index >= from &&
      event?.section === Modules.Utility &&
      [UtilityEvents.ItemCompleted, UtilityEvents.BatchInterrupted].includes(
        event?.method,
      )
    );
  });
}

function getSlicedEvents(wrappedEvents, start, end, wrapped = true) {
  return new WrappedEvents(
    wrappedEvents.events.slice(start, end),
    wrappedEvents.offset + start,
    wrapped,
  );
}

async function unwrapProxy(
  api,
  call,
  signer,
  extrinsicIndexer,
  wrappedEvents,
  callHandler,
) {
  if (!isProxyExecutedOk(wrappedEvents?.events)) {
    return 0;
  }

  const innerCallEvents = getProxyInnerCallEvents(wrappedEvents);
  const real = call.args[0].toString();
  const innerCall = call.args[2];
  return await handleWrappedCall(
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
    return 0;
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
    return 0;
  }

  const innerCallEvents = getMultisigInnerCallEvents(wrappedEvents);
  return await handleWrappedCall(
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
  const innerCalls = call.args[0];
  const events = wrappedEvents.events || [];
  let cursor = 0;
  let interrupted = false;

  for (const innerCall of innerCalls) {
    const start = cursor;
    cursor += await handleWrappedCall(
      api,
      innerCall,
      signer,
      extrinsicIndexer,
      getSlicedEvents(wrappedEvents, start, events.length, false),
      callHandler,
    );
    const itemEventIndex = findBatchItemEventIndex(events, cursor);

    if (itemEventIndex < 0) {
      cursor = events.length;
      break;
    }

    interrupted =
      events[itemEventIndex].event.method === UtilityEvents.BatchInterrupted;
    cursor = itemEventIndex + 1;

    if (interrupted) {
      break;
    }
  }

  if (
    events[cursor]?.event?.section === Modules.Utility &&
    events[cursor]?.event?.method === UtilityEvents.BatchCompleted
  ) {
    cursor++;
  }

  return UtilityMethods.batchAll === method && interrupted ? 0 : cursor;
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
    return 0;
  }

  const isSudoAs = SudoMethods.sudoAs === method;
  const targetCall = isSudoAs ? call.args[1] : call.args[0];
  const author = isSudoAs ? call.args[0].toString() : signer;
  const innerCallEvents = getSudoInnerCallEvents(wrappedEvents, method);
  return await handleWrappedCall(
    api,
    targetCall,
    author,
    extrinsicIndexer,
    innerCallEvents,
    callHandler,
  );
}

async function handleWrappedCall(
  api,
  call,
  signer,
  extrinsicIndexer,
  wrappedEvents,
  callHandler,
) {
  const { section, method } = call;
  let consumed = 0;

  if (Modules.Proxy === section && ProxyMethods.proxy === method) {
    consumed = await unwrapProxy(
      api,
      call,
      signer,
      extrinsicIndexer,
      wrappedEvents,
      callHandler,
    );
  } else if (
    Modules.Multisig === section &&
    MultisigMethods.asMulti === method
  ) {
    consumed = await handleMultisig(
      api,
      call,
      signer,
      extrinsicIndexer,
      wrappedEvents,
      callHandler,
    );
  } else if (
    Modules.Utility === section &&
    [
      UtilityMethods.batch,
      UtilityMethods.batchAll,
      UtilityMethods.forceBatch,
    ].includes(method)
  ) {
    consumed = await unwrapBatch(
      api,
      call,
      signer,
      extrinsicIndexer,
      wrappedEvents,
      callHandler,
    );
  } else if (
    Modules.Sudo === section &&
    [SudoMethods.sudo, SudoMethods.sudoAs].includes(method)
  ) {
    consumed = await unwrapSudo(
      api,
      call,
      signer,
      extrinsicIndexer,
      wrappedEvents,
      callHandler,
    );
  }

  if (callHandler) {
    await callHandler(api, call, signer, extrinsicIndexer, wrappedEvents);
  }

  return consumed;
}

export async function handleCallsInExtrinsic(
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
