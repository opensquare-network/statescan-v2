const {
  utils: { extractExtrinsicEvents, isExtrinsicSuccess },
  handleCallsInExtrinsic,
} = require("@osn/scan-common");

const { addVestingCall } = require("../../store/call");

async function handleCall(call, author, extrinsicIndexer, wrappedEvents) {
  if (call.section !== "vesting") {
    return;
  }

  let parsedCall = null;
  if (call.method === "vest") {
    parsedCall = {
      type: "vest",
      target: author,
    };
  }

  if (call.method === "vestOther") {
    parsedCall = {
      type: "vest",
      target: call.args[0].toString(),
    };
  }

  if (call.method === "vestedTransfer") {
    parsedCall = {
      type: "vestedTransfer",
      source: author,
      target: call.args[0].toString(),
      schedule: parseVestingInfo(call.args[1]),
    };
  }

  if (call.method === "forceVestedTransfer") {
    parsedCall = {
      type: "vestedTransfer",
      source: call.args[0].toString(),
      recipient: call.args[1].toString(),
      schedule: parseVestingInfo(call.args[2]),
    };
  }

  if (call.method === "mergeSchedules") {
    parsedCall = {
      type: "mergeSchedules",
      scheduleIndex1: parseInt(call.args[0].toString(), 10),
      scheduleIndex2: parseInt(call.args[1].toString(), 10),
    };
  }

  if (!parsedCall) {
    throw new Error(`Unknown call ${call.section}.${call.method}`);
  }

  parsedCall = {
    extrinsicIndexer,
    signedBy: author,
    call: parsedCall,
  };

  addVestingCall(parsedCall);
}

function parseVestingInfo(map) {
  return {
    locked: map.get("locked").toString(),
    perBlock: map.get("perBlock").toString(),
    startingBlock: parseInt(map.get("startingBlock").toString(), 10),
  };
}

async function handleExtrinsics(extrinsics = [], allEvents = [], blockIndexer) {
  let index = 0;
  for (const extrinsic of extrinsics) {
    const events = extractExtrinsicEvents(allEvents, index);
    if (!isExtrinsicSuccess(events)) {
      continue;
    }

    const extrinsicIndexer = { ...blockIndexer, extrinsicIndex: index++ };
    await handleCallsInExtrinsic(
      extrinsic,
      events,
      extrinsicIndexer,
      handleCall,
    );
  }
}

module.exports = {
  handleExtrinsics,
};
