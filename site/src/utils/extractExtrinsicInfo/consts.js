const Modules = Object.freeze({
  Proxy: "proxy",
  Multisig: "multisig",
  Utility: "utility",
  Sudo: "sudo",
  Timestamp: "timestamp",
  ParachainSystem: "parachainSystem",
  ParaInherent: "paraInherent",
});

const SudoMethods = Object.freeze({
  sudo: "sudo",
  sudoAs: "sudoAs",
});

const SudoEvents = Object.freeze({
  Sudid: "Sudid",
  SudoAsDone: "SudoAsDone",
});

const ProxyMethods = Object.freeze({
  proxy: "proxy",
});

const ProxyEvents = Object.freeze({
  ProxyExecuted: "ProxyExecuted",
});

const MultisigMethods = Object.freeze({
  asMulti: "asMulti",
});

const MultisigEvents = Object.freeze({
  MultisigExecuted: "MultisigExecuted",
});

const UtilityMethods = Object.freeze({
  batch: "batch",
  batchAll: "batchAll",
  forceBatch: "forceBatch",
});

const UtilityEvents = Object.freeze({
  BatchInterrupted: "BatchInterrupted",
  BatchCompleted: "BatchCompleted",
  ItemCompleted: "ItemCompleted",
});

export {
  Modules,
  ProxyMethods,
  ProxyEvents,
  MultisigMethods,
  MultisigEvents,
  UtilityMethods,
  UtilityEvents,
  SudoMethods,
  SudoEvents,
};
