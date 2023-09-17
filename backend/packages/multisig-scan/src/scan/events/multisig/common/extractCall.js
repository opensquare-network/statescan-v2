const {
  call: { findTargetCall, normalizeCall },
  consts: { Modules, MultisigMethods },
} = require("@osn/scan-common");
const { blake2AsU8a } = require("@polkadot/util-crypto");
const { u8aToHex } = require("@polkadot/util");

function extractCall(extrinsic, callHash) {
  if (!extrinsic) {
    return {};
  }

  const targetAsMultiCall = findTargetCall(extrinsic.method, (call) => {
    const { section, method, args } = call;
    if (
      ![Modules.Multisig, Modules.Utility].includes(section) ||
      MultisigMethods.asMulti !== method
    ) {
      return false;
    }

    const callArg = args[3];
    if (callArg.section) {
      return args[3].hash.toString() === callHash;
    } else {
      // to adapt legacy code, type OpaqueCall of arg is `OpaqueCall`.
      return u8aToHex(blake2AsU8a(args[3], 256)) === callHash;
    }
  });

  if (!targetAsMultiCall) {
    return {};
  }

  const innerCall = targetAsMultiCall.args[3];
  return {
    call: normalizeCall(innerCall),
    callHex: innerCall.toHex(),
  };
}

module.exports = {
  extractCall,
};
