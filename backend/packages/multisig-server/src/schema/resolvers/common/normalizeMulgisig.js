function normalizeMultisig(multisig) {
  if (!multisig) {
    return null;
  }

  return {
    ...multisig,
    address: multisig.multisigAddress,
    signatoriesCount: multisig.allSignatories,
  };
}

module.exports = {
  normalizeMultisig,
};
