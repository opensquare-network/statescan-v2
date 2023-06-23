const {
  getVestingsOf,
  getRemovedVestings,
  clearRemovedVestings,
  getChangedAccounts,
  clearChangedAccounts,
} = require("../store/vestings");

const {
  createNewVestings,
  createVestingTimeline,
  updateVestingIndex,
  markVestingsAsRemoved,
} = require("../mongo");

async function handleVestingsChange(blockIndexer) {
  const changedAccounts = getChangedAccounts();

  const newVestingsUpdate = [];
  const removedVestingsUpdate = [];
  const vestingTimelines = [];
  const vestingIndexUpdated = [];

  for (const account of changedAccounts) {
    const vestings = getVestingsOf(account);
    for (let i = 0; i < vestings.length; i++) {
      const vesting = vestings[i];
      if (vesting.indexer === undefined) {
        const newVesting = {
          indexer: {
            initialBlockHeight: blockIndexer.blockHeight,
            initialIndex: i,
            currentIndex: i,
          },
          from: vesting.from,
          target: vesting.target,
          startingBlock: vesting.startingBlock,
          locked: vesting.locked,
          perBlock: vesting.perBlock,
        };

        const vestingCreatedTimeline = {
          vestingIndexer: {
            initialBlockHeight: blockIndexer.blockHeight,
            initialIndex: i,
          },
          event: {
            type: "created",
            blockHeight: blockIndexer.blockHeight,
            from: vesting.from,
            target: vesting.target,
            index: i,
            extrinsicIndexer: vesting.extrinsicIndexer,
          },
        };
        newVestingsUpdate.push(newVesting);
        vestingTimelines.push(vestingCreatedTimeline);
        vesting.indexer = newVesting.indexer;
      } else if (vesting.indexer.currentIndex != i) {
        const vestingUpdated = {
          indexer: {
            initialBlockHeight: vesting.indexer.initialBlockHeight,
            initialIndex: vesting.indexer.initialIndex,
            currentIndex: i,
          },
          target: vesting.target,
        };

        vestingIndexUpdated.push(vestingUpdated);
      }
    }
  }

  const removedVestings = getRemovedVestings();
  for (const [account, vestings] of Object.entries(removedVestings)) {
    for (const vesting of vestings) {
      const vestingRemoveUpdate = {
        indexer: {
          initialBlockHeight: vesting.indexer.initialBlockHeight,
          initialIndex: vesting.indexer.initialIndex,
          currentIndex: -1,
        },
        target: vesting.target,
        removedBlock: blockIndexer.blockHeight,
      };
      removedVestingsUpdate.push(vestingRemoveUpdate);

      const vestingRemovedTimeline = {
        vestingIndexer: {
          initialBlockHeight: vesting.indexer.initialBlockHeight,
          initialIndex: vesting.indexer.initialIndex,
        },
        event: {
          type: "removed",
          blockHeight: blockIndexer.blockHeight,
          from: vesting.from,
          target: vesting.target,
          index: vesting.indexer.initialIndex,
          extrinsicIndexer: vesting.extrinsicIndexer,
        },
      };
      vestingTimelines.push(vestingRemovedTimeline);
    }
  }

  await Promise.all([
    createNewVestings(newVestingsUpdate),
    createVestingTimeline(vestingTimelines),
    updateVestingIndex(vestingIndexUpdated),
    markVestingsAsRemoved(removedVestingsUpdate),
  ]);

  clearRemovedVestings();
  clearChangedAccounts();
}

module.exports = {
  handleVestingsChange,
};
