const { dataAsString } = require("./dataAsString");
const emptySubs = {
  subsCount: 0,
  subsDeposit: 0,
  subs: [],
};

function normalizeSubsInfo(onchainSubs, supersMap = {}) {
  if (!onchainSubs) {
    return emptySubs;
  }

  const subsDeposit = onchainSubs[0].toJSON();
  const subAddresses = onchainSubs[1].toJSON();
  const subs = subAddresses.map((account) => {
    const superOf = supersMap[account];
    if (!superOf.isSome) {
      return { account, name: null };
    }

    return { account, name: dataAsString(superOf.unwrap()[1]) };
  });

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
