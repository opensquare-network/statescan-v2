const {
  enrichVestingCreated,
  enrichVestingRemoved,
  removeEndedVestings,
  getVestings,
  setVestingsOf,
  shouldKeepVesting,
  parseVestingInfo,
} = require("./common");

const {
  SECTION: { VESTING },
  EXTRINSIC_METHOD: { VESTED_TRANSFER },
} = require("../../constants");

async function handleVestedTransfer(call, author, extrinsicIndexer) {
  const { section, method } = call;
  if (section !== VESTING || method !== VESTED_TRANSFER) {
    return;
  }

  const from = author;
  const target = call.args[0].toString();
  const vesting = parseVestingInfo(call.args[1]);
  await handleVestedTransferImpl(from, target, vesting, extrinsicIndexer);
}

async function handleVestedTransferImpl(from, target, vesting, indexer) {
  const vestings = await getVestings(target);
  const { endedVestings, remainedVestings } = removeEndedVestings(
    vestings,
    indexer.blockHeight,
  );

  if (shouldKeepVesting(vesting, indexer.blockHeight)) {
    enrichVestingCreated(from, target, vesting, indexer);
    remainedVestings.push(vesting);
  } else {
    enrichEphemeralVesting(from, target, vesting, indexer);
  }

  enrichVestingRemoved(from, target, endedVestings, indexer);
  setVestingsOf(target, remainedVestings);
}

module.exports = {
  handleVestedTransfer,
  handleVestedTransferImpl,
};
