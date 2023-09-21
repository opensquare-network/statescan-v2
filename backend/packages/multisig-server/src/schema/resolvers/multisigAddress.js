const {
  multisig: { getAddressCol },
} = require("@statescan/mongo");
const {
  utils: { isValidAddress },
} = require("@statescan/common");

async function multisigAddress(_, _args) {
  const { account } = _args;
  if (!isValidAddress(account)) {
    return null;
  }

  const col = await getAddressCol();
  const multisigAccount = await col.findOne(
    { address: account },
    { projection: { _id: 0 } },
  );
  return multisigAccount
    ? {
        ...multisigAccount,
        signatories: multisigAccount.allSignatories,
      }
    : null;
}

module.exports = {
  multisigAddress,
};
