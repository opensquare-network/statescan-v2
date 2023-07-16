const {
  getVestingsOf,
  getRemovedVestings,
  clearRemovedVestings,
  getChangedAccounts,
  getEphemeralVestings,
  clearEphemeralVestings,
  clearChangedAccounts,
} = require("../store/vestings");

const {
  createNewVestings,
  createVestingTimeline,
  updateVestingIndex,
  markVestingsAsRemoved,
} = require("../mongo");

async function handleVestingsChange(blockIndexer) {
  await Promise.all([
    handleChangedAccounts(blockIndexer),
    handleRemovedVestings(blockIndexer),
    handleEphemeralVestings(blockIndexer),
  ]);
}

async function handleRemovedVestings(blockIndexer) {
  const removedVestingsUpdate = [];
  const removedVestings = getRemovedVestings();
  const vestingTimelines = [];
  for (const [account, vestings] of Object.entries(removedVestings)) {
    for (const vesting of vestings) {
      const vestingRemoveUpdate = {
        indexer: {
          ...vesting.indexer,
          currentIndex: -1,
        },
        target: vesting.target,
        removedBlock: blockIndexer.blockHeight,
      };
      removedVestingsUpdate.push(vestingRemoveUpdate);

      const vestingRemovedTimeline = {
        indexer: vesting.extrinsicIndexer,
        vestingIndexer: vesting.indexer,
        event: {
          type: "removed",
          blockHeight: blockIndexer.blockHeight,
          from: vesting.from,
          target: vesting.target,
        },
      };
      vestingTimelines.push(vestingRemovedTimeline);
    }
  }

  await Promise.all([
    createVestingTimeline(vestingTimelines),
    markVestingsAsRemoved(removedVestingsUpdate),
  ]);

  clearRemovedVestings();
}

async function handleChangedAccounts(blockIndexer) {
  const changedAccounts = getChangedAccounts();

  const newVestingsUpdate = [];
  const vestingTimelines = [];
  const vestingIndexUpdated = [];

  for (const account of changedAccounts) {
    const vestings = getVestingsOf(account);
    for (let i = 0; i < vestings.length; i++) {
      const vesting = vestings[i];
      if (vesting.indexer === undefined) {
        const newVesting = {
          indexer: {
            ...vesting.extrinsicIndexer,
            currentIndex: i,
          },
          from: vesting.from,
          target: vesting.target,
          startingBlock: vesting.startingBlock,
          locked: vesting.locked,
          perBlock: vesting.perBlock,
        };
        const vestingCreatedTimeline = {
          indexer: vesting.extrinsicIndexer,
          vestingIndexer: vesting.extrinsicIndexer,
          event: {
            type: "created",
            blockHeight: blockIndexer.blockHeight,
            from: vesting.from,
            target: vesting.target,
          },
        };
        newVestingsUpdate.push(newVesting);
        vestingTimelines.push(vestingCreatedTimeline);
        vesting.indexer = newVesting.indexer;
      } else if (vesting.indexer.currentIndex !== i) {
        const vestingUpdated = {
          indexer: {
            ...vesting.indexer,
            currentIndex: i,
          },
          target: vesting.target,
        };

        vestingIndexUpdated.push(vestingUpdated);
      }
    }
  }

  await Promise.all([
    createNewVestings(newVestingsUpdate),
    createVestingTimeline(vestingTimelines),
    updateVestingIndex(vestingIndexUpdated),
  ]);
  clearChangedAccounts();
}

async function handleEphemeralVestings(blockIndexer) {
  const ephemeralVestings = getEphemeralVestings();
  const newVestingsUpdate = [];
  const vestingTimelines = [];
  for (const [account, vestings] of Object.entries(ephemeralVestings)) {
    for (const vesting of vestings) {
      const newVesting = {
        indexer: {
          ...vesting.extrinsicIndexer,
          currentIndex: -1,
        },
        from: vesting.from,
        target: vesting.target,
        startingBlock: vesting.startingBlock,
        locked: vesting.locked,
        perBlock: vesting.perBlock,
      };
      const vestingCreatedTimeline = {
        indexer: vesting.extrinsicIndexer,
        vestingIndexer: vesting.extrinsicIndexer,
        event: {
          type: "created",
          blockHeight: blockIndexer.blockHeight,
          from: vesting.from,
          target: vesting.target,
        },
      };
      const vestingRemovedTimeline = {
        indexer: vesting.extrinsicIndexer,
        vestingIndexer: vesting.extrinsicIndexer,
        event: {
          type: "removed",
          blockHeight: blockIndexer.blockHeight,
          from: vesting.from,
          target: vesting.target,
        },
      };
      newVestingsUpdate.push(newVesting);
      vestingTimelines.push(vestingCreatedTimeline);
      vestingTimelines.push(vestingRemovedTimeline);
    }
  }

  await Promise.all([
    createNewVestings(newVestingsUpdate),
    createVestingTimeline(vestingTimelines),
  ]);
  clearEphemeralVestings();
}

module.exports = {
  handleVestingsChange,
};
