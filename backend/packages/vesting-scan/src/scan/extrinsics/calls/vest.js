const {
  enrichVestingRemoved,
  removeEndedVestings,
  getVestings,
  setVestingsOf,
} = require("./common");

const {
  SECTION: { VESTING },
  EXTRINSIC_METHOD: { VEST },
} = require("../../constants");

async function handleVest(call, author, extrinsicIndexer) {
  const { section, method } = call;
  if (section !== VESTING || method !== VEST) {
    return;
  }

  const from = author;
  const target = author;
  await handleVestImpl(from, target, extrinsicIndexer);
}

async function handleVestImpl(from, target, indexer) {
  const vestings = await getVestings(target, indexer);
  const { endedVestings, remainedVestings } = removeEndedVestings(
    vestings,
    indexer.blockHeight,
  );

  enrichVestingRemoved(from, target, endedVestings, indexer);
  setVestingsOf(target, remainedVestings);
}

module.exports = {
  handleVest,
  handleVestImpl,
};
