const {
  call: { findTargetCall },
  consts: { Modules, MultisigMethods },
} = require("@osn/scan-common");
const { sortApprovals } = require("./sortApprovals");
const { blake2AsU8a } = require("@polkadot/util-crypto");
const { u8aToHex } = require("@polkadot/util");

function extractSignatories(extrinsic, callHash, who) {
  if (!extrinsic) {
    return {};
  }

  const targetCall = findTargetCall(extrinsic.method, (call) => {
    const { section, method, args } = call;
    if (
      [Modules.Multisig, Modules.Utility].includes(section) &&
      MultisigMethods.asMulti === method
    ) {
      const callArg = args[3];
      if (callArg.section) {
        return args[3].hash.toString() === callHash;
      } else {
        // to adapt legacy code, type OpaqueCall of arg is `OpaqueCall`.
        return u8aToHex(blake2AsU8a(args[3], 256)) === callHash;
      }
    } else if (
      [Modules.Multisig, Modules.Utility].includes(section) &&
      "approveAsMulti" === method
    ) {
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
