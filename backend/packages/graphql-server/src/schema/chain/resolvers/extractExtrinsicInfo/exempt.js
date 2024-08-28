const {
  Modules,
  ProxyMethods,
  MultisigMethods,
  UtilityMethods,
  SudoMethods,
} = require("@osn/scan-common/src/consts");

function isExemptedCall(section, method) {
  if (
    [
      Modules.Timestamp,
      Modules.ParachainSystem,
      Modules.ParaInherent,
      "parachains",
    ].includes(section)
  ) {
    return true;
  }

  if (
    (Modules.Proxy === section && ProxyMethods.proxy === method) ||
    (Modules.Multisig === section && MultisigMethods.asMulti) ||
    (Modules.Utility === section &&
      [UtilityMethods.batch, UtilityMethods.batchAll].includes(method)) ||
    (Modules.Sudo === section &&
      [SudoMethods.sudo, SudoMethods.sudoAs].includes(method))
  ) {
    return true;
  }

  // todo: check other sections and methods
  return false;
}

module.exports = { isExemptedCall };
