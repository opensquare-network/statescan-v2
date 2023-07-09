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
  if (vestings.length === 0) {
    return;
  }

  const vestingCol = await getVestingCol();
  const bulkOp = vestingCol.initializeUnorderedBulkOp();

  vestings.forEach((vesting) => {
    bulkOp
      .find({
        "indexer.blockHeight": vesting.indexer.blockHeight,
        "indexer.extrinsicIndex": vesting.indexer.extrinsicIndex,
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
  if (vestingTimelines.length === 0) {
    return;
  }

  const vestingTimelineCol = await getVestingTimelineCol();
  const bulkOp = vestingTimelineCol.initializeUnorderedBulkOp();

  vestingTimelines.forEach((vestingTimeline) => {
    bulkOp
      .find({
        "indexer.blockHeight": vestingTimeline.indexer.blockHeight,
        "indexer.extrinsicIndex": vestingTimeline.indexer.extrinsicIndex,
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
  if (vestingIndexUpdates.length === 0) {
    return;
  }

  const vestingCol = await getVestingCol();
  const bulkOp = vestingCol.initializeUnorderedBulkOp();
  vestingIndexUpdates.forEach((update) => {
    bulkOp
      .find({
        "indexer.blockHeight": update.indexer.blockHeight,
        "indexer.extrinsicIndex": update.indexer.extrinsicIndex,
      })
      .updateOne({
        $set: {
          indexer: update.indexer,
        },
      });
  });

  await bulkOp.execute();
}

async function markVestingsAsRemoved(vestingRemovals) {
  if (vestingRemovals.length === 0) {
    return;
  }

  const vestingCol = await getVestingCol();
  const bulkOp = vestingCol.initializeUnorderedBulkOp();
  vestingRemovals.forEach((removal) => {
    bulkOp
      .find({
        "indexer.blockHeight": removal.indexer.blockHeight,
        "indexer.extrinsicIndex": removal.indexer.extrinsicIndex,
      })
      .updateOne({
        $set: {
          indexer: removal.indexer,
          removedBlock: removal.removedBlock,
        },
      });
  });

  await bulkOp.execute();
}

async function upsertAccounts(accounts) {
  if (accounts.length === 0) {
    return;
  }

  const accountCol = await getAccountCol();
  const bulkOp = accountCol.initializeUnorderedBulkOp();
  accounts.forEach((account) => {
    bulkOp
      .find({
        account: account.account,
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
