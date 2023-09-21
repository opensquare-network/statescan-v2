const {
  consts: { Modules, MultisigMethods },
} = require("@osn/scan-common");
const { blake2AsU8a } = require("@polkadot/util-crypto");
const { u8aToHex } = require("@polkadot/util");

function getCallHashFromExtrinsic(extrinsic, indexer) {
  const { section, method, args } = extrinsic.method;
  if (
    ![Modules.Utility, Modules.Multisig].includes(section) ||
    MultisigMethods.asMulti !== method
  ) {
    throw new Error(
      `Invalid extrinsic to get callHash at ${indexer.blockHeight}`,
    );
  }

  const callArg = args[3];
  if (callArg.section) {
    return args[3].hash.toString();
  } else {
    // to adapt legacy code, type OpaqueCall of arg is `OpaqueCall`.
    return u8aToHex(blake2AsU8a(args[3], 256));
  }
}

module.exports = {
  getCallHashFromExtrinsic,
};
