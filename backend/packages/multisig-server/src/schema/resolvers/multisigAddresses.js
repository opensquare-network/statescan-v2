const {
  multisig: { getAddressCol },
} = require("@statescan/mongo");

async function multisigAddresses(_, _args) {
  const { offset, limit, sort } = _args;

  const querySort = { "debutAt.blockHeight": -1 };
  if (sort === "DEBUT_AT_HEIGHT_DESC") {
    Object.assign(querySort, { "debutAt.blockHeight": -1 });
  } else if (sort === "DEBUT_AT_HEIGHT_ASC") {
    Object.assign(querySort, { "debutAt.blockHeight": 1 });
  } else if (sort === "LATEST_MULTISIG_AT_HEIGHT_DESC") {
    Object.assign(querySort, { "latestMultisigAt.blockHeight": -1 });
  } else if (sort === "LATEST_MULTISIG_AT_HEIGHT_ASC") {
    Object.assign(querySort, { "debutAt.blockHeight": 1 });
  }

  const col = await getAddressCol();
  const addresses = await col
    .find({}, { projection: { _id: 0 } })
    .sort(querySort)
    .skip(offset)
    .limit(limit)
    .toArray();
  const total = await col.estimatedDocumentCount();

  return {
    multisigAddresses: addresses.map((address) => ({
      ...address,
      signatories: address.allSignatories,
    })),
    offset,
    limit,
    total,
  };
}

module.exports = {
  multisigAddresses,
};
