const {
  call: { findTargetCall },
  consts: { Modules, MultisigMethods },
} = require("@osn/scan-common");
const { sortApprovals } = require("./sortApprovals");

function extractSignatories(extrinsic, callHash, who) {
  if (!extrinsic) {
    return {};
  }

  const targetCall = findTargetCall(extrinsic.method, (call) => {
    const { section, method, args } = call;
    if (Modules.Multisig === section && MultisigMethods.asMulti === method) {
      return args[3].hash.toString() === callHash;
    } else if (Modules.Multisig === section && "approveAsMulti" === method) {
      return args[3].toString() === callHash;
    } else {
      return false;
    }
  });

  if (!targetCall) {
    return {};
  }

  return {
    allSignatories: sortApprovals([...targetCall.args[1].toJSON(), who]),
    threshold: targetCall.args[0].toNumber(),
  };
}

module.exports = {
  extractSignatories,
};
