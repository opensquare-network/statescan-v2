const {
  env: { currentChain },
} = require("@osn/scan-common");

const commonNecessarySections = [
  "balances",
  "sudo",
  "multisig",
  "proxy",
  "utility",
  "staking",
  "nominationPools",
  "council",
  "technicalCommittee",
  "system",
  "transactionPayment",
  "treasury",
  "bounties",
  "childBounties",
  "democracy",
  "referenda",
  "convictionVoting",
  "fellowshipReferenda",
  "fellowshipCollectives",
  "fellowshipCore",
  "fellowshipSalary",
  "fellowshipTreasury",
];

const chainsNeedToHandle = [
  "westend",
  "paseo",
  "bridgehub-paseo",
  "bridgehub-kusama",
  "bridgehub-polkadot",
];

function getEventWithCleanedArgs(normalizedEvent) {
  const { section } = normalizedEvent || {};
  if (
    commonNecessarySections.includes(section) ||
    !chainsNeedToHandle.includes(currentChain())
  ) {
    return normalizedEvent;
  }

  return {
    ...(normalizedEvent || {}),
    args: null,
  };
}

module.exports = {
  getEventWithCleanedArgs,
};
