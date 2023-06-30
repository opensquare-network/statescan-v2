const emptySubs = {
  subsCount: 0,
  subsDeposit: 0,
  subs: [],
};

function normalizeSubsInfo(onchainSubs) {
  if (!onchainSubs) {
    return emptySubs;
  }

  const subsDeposit = onchainSubs[0].toJSON();
  const subs = onchainSubs[1].toJSON();

  return {
    subsCount: subs.length,
    subsDeposit,
    subs,
  };
}

module.exports = {
  normalizeSubsInfo,
  emptySubs,
};
