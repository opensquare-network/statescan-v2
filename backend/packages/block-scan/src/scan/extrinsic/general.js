const {
  chain: { getExtrinsicSigner },
} = require("@osn/scan-common");

function isGeneralExtrinsic(extrinsic) {
  return typeof extrinsic.isGeneral === "function" && extrinsic.isGeneral();
}

/**
 * A general transaction (extrinsic format v5, preamble 0x45) carries no top level
 * signature: it is authorized by its transaction extensions, so polkadot.js reports it
 * as not signed and throws when `signer` or `signature` is read.
 *
 * Resolve what the scan needs from it: whether it counts as a signed transaction, and
 * the account its extensions authorized. `isGeneral` tells the caller to stay away from
 * the `signature` getter.
 */
function resolveExtrinsic(extrinsic) {
  if (!isGeneralExtrinsic(extrinsic)) {
    return {
      isGeneral: false,
      isSigned: !!extrinsic.isSigned,
      signer: undefined,
    };
  }

  // undefined when no extension authorized an account, e.g. VerifyMultiSignature Disabled
  const signer = getExtrinsicSigner(extrinsic);
  return { isGeneral: true, isSigned: !!signer, signer };
}

module.exports = {
  isGeneralExtrinsic,
  resolveExtrinsic,
};
