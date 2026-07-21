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

// Bulletin store extrinsic args carry the full data payload (up to 2MB),
// so clean extrinsic args but keep transactionStorage events, which only
// carry the CID/content hash.
const necessaryEventSections = [
  ...commonNecessarySections,
  "transactionStorage",
];

const chainsNeedToClean = [
  "westend",
  "paseo",
  "bridgehub-paseo",
  "bridgehub-kusama",
  "bridgehub-polkadot",
  "frequency",
  "gargantua",
  "nexus",
  "datahaven-testnet",
  "argon",
  "bulletin-polkadot",
];

const chainsNoNeedCalls = [...chainsNeedToClean, "bridgehub-westend"];

module.exports = {
  commonNecessarySections,
  necessaryEventSections,
  chainsNeedToClean,
  chainsNoNeedCalls,
};
