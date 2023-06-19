const {
  utils: { extractExtrinsicEvents, isExtrinsicSuccess },
  handleCallsInExtrinsic,
} = require("@osn/scan-common");

const { addNewVesting } = require("../../store/vesting");

async function handleCall(call, author, extrinsicIndexer, wrappedEvents) {
  if (call.section !== "vesting") {
    return;
  }

  const method = call.method;
  const args = call.args;
  const blockHeight = extrinsicIndexer.blockHeight;

  if (method === "vestedTransfer" || method === "forceVestedTransfer") {
    const from = method === "vestedTransfer" ? author : args[0].toString();
    const to =
      method === "vestedTransfer" ? args[0].toString() : args[1].toString();
    const schedule =
      method == "vestedTransfer"
        ? parseVestingInfo(args[1])
        : parseVestingInfo(args[2]);

    handleVestedTransfer(from, to, schedule, extrinsicIndexer);
  }

  if (method === "vest" || method === "vestOther") {
    const from = author;
    const target = method === "vest" ? author : args[0].toString();
    handleVest(from, target, extrinsicIndexer);
  }

  if (method === "mergeSchedules") {
    const index1 = parseInt(args[0].toString(), 10);
    const index2 = parseInt(args[1].toString(), 10);

    handleMerge(from, target, index1, index2, extrinsicIndexer);
  }
}

function lockedAt(vesting, blockHeight) {
  const vestedBlockCount = blockHeight - vesting.starting_block;
  return Math.max(0, vesting.locked - vestedBlockCount * vesting.per_block);
}

async function getPreviousVestings(account, indexer) {
  //TODO: ENRICH it with index
  return [];
}

function setVestings(account, vestings) {}

function shouldKeepVesting(vesting, blockHeight) {
  return lockedAt(vesting, blockHeight) === 0;
}

function removeEndedVestings(vestings, blockHeight) {
  const endedVestings = [];
  const remainedVestings = [];

  for (const vesting of vestings) {
    if (shouldKeepVesting(vesting, blockHeight)) {
      endedVestings.push(vesting);
    } else {
      remainedVestings.push(vesting);
    }
  }

  return {
    endedVestings,
    remainedVestings,
  };
}

function handleVestedTransfer(from, target, vesting, indexer) {
  const vestings = getPreviousVestings(target, indexer);
  const { endedVestings, remainingVestings } = removeEndedVestings(
    vestings,
    indexer.blockHeight,
  );

  // if the vesting is ended in this block, we can't assign a index to it. so we just ignore it.
  if (shouldKeepVesting(vesting)) {
    // we can't decide the final index of the newly created vesting now since there could be serveral vestedTransfer/vest/merge action in one block.
    remainingVestings.push(vesting);

    // TODO record index as newly created vesting
  }

  // TODO record endedVestings

  setVestings(target, remainingVestings);
}

function handleVest(from, target, indexer) {
  const vestings = getPreviousVestings(target, indexer);
  const { endedVestings, remainingVestings } = removeEndedVestings(
    vestings,
    indexer.blockHeight,
  );

  // TODO record endedVestings
  setVestings(target, remainingVestings);
}

function endingBlock(vesting) {
  let duration = 1;
  if (vesting.per_block < vesting.locked) {
    let extra = 1;
    if (vesting.locked % vesting.per_block === 0) {
      extra = 0;
    }
    duration = Math.floor(vesting.locked / vesting.per_block) + extra;
  }

  return vesting.starting_block + duration;
}

function handleMerge(from, target, index1, index2, indexer) {
  if (index1 == index2) {
    return;
  }

  const vestings = getPreviousVestings(target, indexer);

  const vesting1 = vestings[index1];
  const vesting2 = vestings[index2];

  const filteredVestings = vestings.filter((val, index) => {
    return index !== index1 && index !== index2;
  });

  const { endedVestings, remainingVestings } = removeEndedVestings(
    filteredVestings,
    indexer.blockHeight,
  );

  const mergedVesting = mergeTwoVestings(
    vesting1,
    vesting2,
    indexer.blockHeight,
  );

  remainingVestings.push(mergedVesting);
  setVestings(target, remainingVestings);
}

function mergeTwoVestings(vesting1, vesting2, blockHeight) {
  const endingBlock1 = endingBlock(vesting1);
  const endingBlock2 = endingBlock(vesting2);

  const vesting1Ended = endingBlock1 <= blockHeight;
  const vesting2Ended = endingBlock2 <= blockHeight;

  if (vesting1Ended && vesting2Ended) {
    return null;
  }

  if (vesting1Ended) {
    return vesting2;
  }

  if (vesting2Ended) {
    return vesting1;
  }

  const endedBlock = Math.max(endingBlock1, endingBlock2);
  const startBlock = Math.max(
    vesting1.starting_block,
    vesting2.starting_block,
    blockHeight,
  );
  const locked =
    lockedAt(vesting1, blockHeight) + lockedAt(vesting2, blockHeight);

  let duration = Math.max(1, endedBlock - startBlock);
  let perBlock = Math.max(1, Math.floor(locked / duration));

  return {
    starting_block: startBlock,
    locked,
    per_block: perBlock,
  };
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
