const BalancesEvents = Object.freeze({
  Endowed: "Endowed",
  DustLost: "DustLost",
  Transfer: "Transfer",
  Reserved: "Reserved",
  Unreserved: "Unreserved",
  Deposit: "Deposit",
  Withdraw: "Withdraw",
  Slashed: "Slashed",
  ReserveRepatriated: "ReserveRepatriated",
  BalanceSet: "BalanceSet",
});

const SingleAccountEvents = [
  BalancesEvents.Endowed,
  BalancesEvents.BalanceSet,
  BalancesEvents.DustLost,
  BalancesEvents.Reserved,
  BalancesEvents.Unreserved,
  BalancesEvents.Deposit,
  BalancesEvents.Withdraw,
  BalancesEvents.Slashed,
];

const TwoAccountEvents = [
  BalancesEvents.Transfer,
  BalancesEvents.ReserveRepatriated
];

module.exports = {
  BalancesEvents,
  SingleAccountEvents,
  TwoAccountEvents,
}
