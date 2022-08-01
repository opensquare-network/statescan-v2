const { consts: { Modules } } = require("@osn/scan-common");

function isExemptedCall(section, method) {
  if ([Modules.Timestamp, Modules.ParachainSystem, Modules.ParaInherent].includes(section)) {
    return true;
  }

  // todo: check other sections and methods
  return false;
}

module.exports = {
  isExemptedCall,
}
