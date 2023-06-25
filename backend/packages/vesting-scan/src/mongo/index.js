const { Decimal128 } = require("mongodb");
const {
  vesting: {
    getVestingCol,
    getVestingTimelineCol,
    getAccountCol,
    getAccountTimelineCol,
  },
} = require("@statescan/mongo");

async function getCurrentVestingsOf(target) {
  const vestingCol = await getVestingCol();
  const vestings = await vestingCol
    .find({
      target,
      removedBlock: { $exists: false },
    })
    .map((vesting) => {
      return {
        ...vesting,
        locked: BigInt(vesting.locked),
        perBlock: BigInt(vesting.perBlock),
      };
    })
    .toArray();

  return vestings;
}

async function createNewVestings(vestings) {
  if (vestings.length == 0) {
    return;
  }

  const vestingCol = await getVestingCol();
  const bulkOp = vestingCol.initializeUnorderedBulkOp();

  vestings.forEach((vesting) => {
    bulkOp
      .find({
        "indexer.initialBlockHeight": vesting.indexer.initialBlockHeight,
        "indexer.initialIndex": vesting.indexer.initialIndex,
        target: vesting.target,
      })
      .upsert()
      .updateOne({
        $set: {
          ...vesting,
          locked: toDecimal128(vesting.locked),
          perBlock: toDecimal128(vesting.perBlock),
        },
      });
  });

  await bulkOp.execute();
}

async function createVestingTimeline(vestingTimelines) {
  if (vestingTimelines.length == 0) {
    return;
  }

  const vestingTimelineCol = await getVestingTimelineCol();
  const bulkOp = vestingTimelineCol.initializeUnorderedBulkOp();

  vestingTimelines.forEach((vestingTimeline) => {
    bulkOp
      .find({
        "event.extrinsicIndexer.blockHeight":
          vestingTimeline.event.extrinsicIndexer.blockHeight,
        "event.extrinsicIndexer.index":
          vestingTimeline.event.extrinsicIndexer.extrinsicIndex,
      })
      .upsert()
      .updateOne({
        $set: {
          ...vestingTimeline,
        },
      });
  });

  await bulkOp.execute();
}

async function updateVestingIndex(vestingIndexUpdates) {
  if (vestingIndexUpdates.length == 0) {
    return;
  }

  const vestingCol = await getVestingCol();
  const bulkOp = vestingCol.initializeUnorderedBulkOp();
  vestingIndexUpdates.forEach((update) => {
    bulkOp
      .find({
        "indexer.initialBlockHeight": update.indexer.initialBlockHeight,
        "indexer.initialIndex": update.indexer.initialIndex,
        target: update.target,
      })
      .updateOne({
        $set: {
          indexer: {
            currentIndex: update.indexer.currentIndex,
          },
        },
      });
  });

  await bulkOp.execute();
}

async function markVestingsAsRemoved(vestingRemovals) {
  if (vestingRemovals.length == 0) {
    return;
  }

  const vestingCol = await getVestingCol();
  const bulkOp = vestingCol.initializeUnorderedBulkOp();
  vestingRemovals.forEach((removal) => {
    bulkOp
      .find({
        "indexer.initialBlockHeight": removal.indexer.initialBlockHeight,
        "indexer.initialIndex": removal.indexer.initialIndex,
        target: removal.target,
      })
      .updateOne({
        $set: {
          indexer: {
            currentIndex: removal.indexer.currentIndex,
          },
          removedBlock: removal.removedBlock,
        },
      });
  });
}

async function upsertAccounts(accounts) {
  if (accounts.length == 0) {
    return;
  }

  const accountCol = await getAccountCol();
  const bulkOp = accountCol.initializeUnorderedBulkOp();
  accounts.forEach((account) => {
    bulkOp
      .find({
        address: account.address,
      })
      .upsert()
      .updateOne({
        $set: {
          ...account,
          locked: toDecimal128(account.locked),
        },
      });
  });

  await bulkOp.execute();
}

async function upsertAccountTimeline(accountTimelines) {
  if (accountTimelines.length === 0) {
    return;
  }

  const accountTimelineCol = await getAccountTimelineCol();
  const bulkOp = accountTimelineCol.initializeUnorderedBulkOp();
  accountTimelines.forEach((accountTimeline) => {
    bulkOp
      .find({
        "indexer.blockHeight": accountTimeline.indexer.blockHeight,
        "indexer.extrinsicIndex": accountTimeline.indexer.extrinsicIndex,
        "indexer.eventIndex": accountTimeline.indexer.eventIndex,
      })
      .upsert()
      .updateOne({
        $set: {
          ...accountTimeline,
          locked: toDecimal128(accountTimeline.locked),
        },
      });
  });

  await bulkOp.execute();
}

function toDecimal128(amount) {
  return Decimal128.fromString(amount.toString());
}

module.exports = {
  getCurrentVestingsOf,
  createNewVestings,
  createVestingTimeline,
  updateVestingIndex,
  markVestingsAsRemoved,
  upsertAccounts,
  upsertAccountTimeline,
};
