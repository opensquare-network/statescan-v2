const {
  getVestingsOf,
  addRemovedVestings,
  setVestingsOf,
  addChangedAccount,
} = require("../../../store/vestings");

const { getVestingsFromDb } = require("../../../service/vestings");

async function getVestings(account) {
  let vestings = getVestingsOf(account);
  if (vestings === undefined) {
    vestings = await getVestingsFromDb(account);
  }
  return vestings;
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

function parseVestingInfo(vesting) {
  return {
    locked: BigInt(vesting.get("locked").toString()),
    perBlock: BigInt(vesting.get("perBlock").toString()),
    startingBlock: parseInt(vesting.get("startingBlock").toString(), 10),
  };
}

module.exports = {
  enrichVestingCreated,
  enrichVestingRemoved,
  removeEndedVestings,
  getVestings,
  shouldKeepVesting,
  setVestingsOf,
  parseVestingInfo,
  lockedAt,
  max,
};
