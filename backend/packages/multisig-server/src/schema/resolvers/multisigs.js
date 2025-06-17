const {
  utils: { isValidAddress },
  consts: { MultisigStateType },
} = require("@statescan/common");
const {
  multisig: { getMultisigCol },
} = require("@statescan/mongo");
const { normalizeMultisig } = require("./common/normalizeMulgisig");

function getMultisigStateValue(stateEnumValue) {
  if ("APPROVING" === stateEnumValue) {
    return MultisigStateType.Approving;
  } else if ("EXECUTED" === stateEnumValue) {
    return MultisigStateType.Executed;
  } else if ("CANCELLED" === stateEnumValue) {
    return MultisigStateType.Cancelled;
  }

  throw new Error(`Unknown multisig state enum value, ${stateEnumValue}`);
}

async function multisigs(_, _args) {
  const { offset, limit, account, signatory, multisigState } = _args;

  const col = await getMultisigCol();
  if (account && !isValidAddress(account)) {
    return {
      multisigs: [],
      offset,
      limit,
      total: await col.estimatedDocumentCount(),
    };
  }

  let q = {};
  if (account && isValidAddress(account)) {
    Object.assign(q, { multisigAddress: account });
  }
  if (multisigState) {
    Object.assign(q, { "state.name": getMultisigStateValue(multisigState) });
  }
  if (signatory) {
    Object.assign(q, { signatories: signatory });
  }

  const multisigs = await col
    .find(q, { projection: { _id: 0 } })
    .sort({
      "state.sortValue": 1,
      "indexer.blockHeight": -1,
    })
    .skip(offset)
    .limit(limit)
    .toArray();
  const total = await col.countDocuments(q);

  return {
    multisigs: multisigs
      .filter((item) => item.signatories)
      .map(normalizeMultisig),
    offset,
    limit,
    total,
  };
}

module.exports = {
  multisigs,
};
