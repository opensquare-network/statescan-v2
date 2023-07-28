const {
  enrichVestingCreated,
  enrichVestingRemoved,
  removeEndedVestings,
  getVestings,
  setVestingsOf,
  lockedAt,
  max,
} = require("./common");

const {
  SECTION: { VESTING },
  EXTRINSIC_METHOD: { MERGE_SCHEDULES },
} = require("../../constants");

async function handleMergeSchedules(call, author, extrinsicIndexer) {
  const { section, method, args } = call;
  if (section !== VESTING || method !== MERGE_SCHEDULES) {
    return;
  }

  const from = author;
  const target = author;
  const index1 = parseInt(args[0].toString(), 10);
  const index2 = parseInt(args[1].toString(), 10);
  await handleMergeSchedulesImpl(
    from,
    target,
    index1,
    index2,
    extrinsicIndexer,
  );
}

async function handleMergeSchedulesImpl(from, target, index1, index2, indexer) {
  if (index1 === index2) {
    return;
  }

  const vestings = await getVestings(target, indexer);

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

  enrichVestingRemoved(from, target, endedVestings, indexer);
  setVestingsOf(target, remainedVestings);
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
  let perBlock = max(1n, locked / BigInt(duration));

  return {
    startingBlock: startBlock,
    locked,
    perBlock: perBlock,
  };
}

function endingBlock(vesting) {
  let duration = 1;
  if (vesting.perBlock < vesting.locked) {
    let extra = 1n;
    if (vesting.locked % vesting.perBlock === 0n) {
      extra = 0n;
    }
    duration = Number(vesting.locked / vesting.perBlock + extra);
  }

  return vesting.startingBlock + duration;
}

module.exports = {
  handleMergeSchedules,
};
