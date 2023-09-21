const {
  utils: { isValidAddress },
} = require("@statescan/common");
const {
  multisig: { getMultisigCol },
} = require("@statescan/mongo");
const { normalizeMultisig } = require("./common/normalizeMulgisig");

async function multisig(_, _args) {
  const { account, whenHeight, whenExtrinsicIndex } = _args;
  if (!isValidAddress(account)) {
    return null;
  }

  const col = await getMultisigCol();
  const multisig = await col.findOne(
    {
      multisigAddress: account,
      "when.height": whenHeight,
      "when.index": whenExtrinsicIndex,
    },
    { projection: { _id: 0 } },
  );

  return normalizeMultisig(multisig);
}

module.exports = {
  multisig,
};
