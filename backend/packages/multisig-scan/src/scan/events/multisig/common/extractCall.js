const {
  call: { findTargetCall, normalizeCall },
  consts: { Modules, MultisigMethods },
} = require("@osn/scan-common");

function extractCall(extrinsic, callHash) {
  if (!extrinsic) {
    return {};
  }

  const targetAsMultiCall = findTargetCall(extrinsic.method, (call) => {
    const { section, method, args } = call;
    if (Modules.Multisig !== section || MultisigMethods.asMulti !== method) {
      return false;
    }

    return args[3].hash.toString() === callHash;
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
