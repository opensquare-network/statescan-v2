const { handleCallsInExtrinsic } = require("./callInExtrinsic");
const { isExemptedCall } = require("./exempt");
const {
  normalizeCall,
} = require("@osn/scan-common/src/extrinsic/call/normalize");

class CallsInExtrinsic {
  constructor() {
    this.callIndex = 0;
    this.calls = [];
  }

  async handleCall(api, call, author, extrinsicIndexer, wrappedEvents) {
    const { section, method } = call;
    if (isExemptedCall(section, method)) {
      return;
    }

    const normalizedCall = normalizeCall(call);
    const indexer = {
      ...extrinsicIndexer,
      callIndex: this.callIndex,
    };

    let eventAttributes = {
      isCall: false,
    };
    if (wrappedEvents.wrapped) {
      eventAttributes.isCall = true;
      eventAttributes.offset = wrappedEvents.offset;
      eventAttributes.length = wrappedEvents.events.length;
    }

    this.calls.push({
      indexer,
      ...normalizedCall,
      eventAttributes,
    });

    this.callIndex++;
  }
}

async function extractCallsFromExtrinsic(
  api,
  extrinsic,
  events,
  extrinsicIndexer,
) {
  const callsInExtrinsic = new CallsInExtrinsic();

  await handleCallsInExtrinsic(
    api,
    extrinsic,
    events,
    extrinsicIndexer,
    (...args) => callsInExtrinsic.handleCall(...args),
  );

  return callsInExtrinsic.calls;
}

module.exports = {
  extractCallsFromExtrinsic,
};
