const {
  utils: { extractExtrinsicEvents, isExtrinsicSuccess },
  handleCallsInExtrinsic,
} = require("@osn/scan-common");

const {
  getVestingsOf,
  addRemovedVestings,
  setVestingsOf,
  addChangedAccount,
} = require("../../store/vestings");

const { getVestingsFromDb } = require("../../service/vestings");

async function handleCall(call, author, extrinsicIndexer, wrappedEvents) {
  if (call.section !== "vesting") {
    return;
  }

  const method = call.method;
  const args = call.args;

  if (method === "vestedTransfer" || method === "forceVestedTransfer") {
    const from = method === "vestedTransfer" ? author : args[0].toString();
    const to =
      method === "vestedTransfer" ? args[0].toString() : args[1].toString();
    const schedule =
      method == "vestedTransfer"
        ? parseVestingInfo(args[1])
        : parseVestingInfo(args[2]);

    await handleVestedTransfer(from, to, schedule, extrinsicIndexer);
  }

  if (method === "vest" || method === "vestOther") {
    const from = author;
    const target = method === "vest" ? author : args[0].toString();
    await handleVest(from, target, extrinsicIndexer);
  }

  if (method === "mergeSchedules") {
    const index1 = parseInt(args[0].toString(), 10);
    const index2 = parseInt(args[1].toString(), 10);

    await handleMerge(author, author, index1, index2, extrinsicIndexer);
  }
}

function enrichVestingCreated(from, target, vesting, extrinsicIndexer) {
  addChangedAccount(target);
  vesting.from = from;
  vesting.target = target;
  vesting.extrinsicIndexer = {
    blockHeight: extrinsicIndexer.blockHeight,
    blockHash: extrinsicIndexer.blockHash,
    extrinsicIndex: extrinsicIndexer.extrinsicIndex,
  };
}

function enrichVestingRemoved(from, target, vestings, extrinsicIndexer) {
  for (const vesting of vestings) {
    vesting.from = from;
    vesting.target = target;
    vesting.extrinsicIndexer = {
      blockHeight: extrinsicIndexer.blockHeight,
      blockHash: extrinsicIndexer.blockHash,
      extrinsicIndex: extrinsicIndexer.extrinsicIndex,
    };
  }
  addChangedAccount(target);
  addRemovedVestings(target, vestings);
}

function lockedAt(vesting, blockHeight) {
  const vestedBlockCount = blockHeight - vesting.startingBlock;
  return max(0n, vesting.locked - BigInt(vestedBlockCount) * vesting.perBlock);
}

function max(a, b) {
  return a > b ? a : b;
}

async function getVestings(account, indexer) {
  let vestings = getVestingsOf(account);
  if (vestings === undefined) {
    vestings = await getVestingsFromDb(account);
  }
  return vestings;
}

function setVestings(account, vestings) {
  setVestingsOf(account, vestings);
}

function shouldKeepVesting(vesting, blockHeight) {
  return lockedAt(vesting, blockHeight) !== 0n;
}

function removeEndedVestings(vestings, blockHeight) {
  const endedVestings = [];
  const remainedVestings = [];

  for (const vesting of vestings) {
    if (!shouldKeepVesting(vesting, blockHeight)) {
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

async function handleVestedTransfer(from, target, vesting, indexer) {
  const vestings = await getVestings(target, indexer);
  const { endedVestings, remainedVestings } = removeEndedVestings(
    vestings,
    indexer.blockHeight,
  );

  // if the vesting is ended in this block, we can't assign a index to it. so we just ignore it.
  if (shouldKeepVesting(vesting, indexer.blockHeight)) {
    // we can't decide the final index of the newly created vesting now since there could be serveral vestedTransfer/vest/merge action in one block.
    enrichVestingCreated(from, target, vesting, indexer);
    remainedVestings.push(vesting);
  }

  enrichVestingRemoved(from, target, endedVestings, indexer);
  setVestings(target, remainedVestings);
}

async function handleVest(from, target, indexer) {
  const vestings = await getVestings(target, indexer);
  const { endedVestings, remainedVestings } = removeEndedVestings(
    vestings,
    indexer.blockHeight,
  );

  enrichVestingRemoved(from, target, endedVestings, indexer);
  setVestings(target, remainedVestings);
}

function endingBlock(vesting) {
  let duration = 1;
  if (vesting.perBlock < vesting.locked) {
    let extra = 1;
    if (vesting.locked % vesting.perBlock === 0n) {
      extra = 0;
    }
    duration = Math.floor(number(vesting.locked / vesting.perBlock)) + extra;
  }

  return vesting.startingBlock + duration;
}

async function handleMerge(from, target, index1, index2, indexer) {
  if (index1 == index2) {
    return;
  }

  const vestings = getVestings(target, indexer);

  const vesting1 = vestings[index1];
  const vesting2 = vestings[index2];

  const filteredVestings = vestings.filter((val, index) => {
    return index !== index1 && index !== index2;
  });

  const { endedVestings, remainedVestings } = removeEndedVestings(
    filteredVestings,
    indexer.blockHeight,
  );

  endedVestings.push(vesting1);
  endedVestings.push(vesting2);

  const mergedVesting = mergeTwoVestings(
    vesting1,
    vesting2,
    indexer.blockHeight,
  );

  if (mergedVesting !== null) {
    enrichVestingCreated(from, target, mergedVesting, indexer);
    remainedVestings.push(mergedVesting);
  }

  enrichVestingRemoved(from, target, endedVestings, extrinsicIndexer);
  setVestings(target, remainedVestings);
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
    vesting1.startingBlock,
    vesting2.startingBlock,
    blockHeight,
  );
  const locked =
    lockedAt(vesting1, blockHeight) + lockedAt(vesting2, blockHeight);

  let duration = Math.max(1, endedBlock - startBlock);
  let perBlock = max(1n, Math.floor(locked / BigInt(duration)));

  return {
    startingBlock: startBlock,
    locked,
    perBlock: perBlock,
  };
}

function parseVestingInfo(map) {
  return {
    locked: BigInt(map.get("locked").toString()),
    perBlock: BigInt(map.get("perBlock").toString()),
    startingBlock: parseInt(map.get("startingBlock").toString(), 10),
  };
}

async function handleExtrinsics(
  extrinsics = [],
  allEvents = [],
  blockIndexer,
  parentHash,
) {
  let index = 0;
  for (const extrinsic of extrinsics) {
    const events = extractExtrinsicEvents(allEvents, index);
    if (!isExtrinsicSuccess(events)) {
      continue;
    }

    const extrinsicIndexer = {
      ...blockIndexer,
      extrinsicIndex: index++,
      parentHash,
    };
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
