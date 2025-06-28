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

const chainsNeedToClean = [
  "westend",
  "paseo",
  "bridgehub-paseo",
  "bridgehub-kusama",
  "bridgehub-polkadot",
];

module.exports = {
  commonNecessarySections,
  chainsNeedToClean,
};
