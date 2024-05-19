const {
  palletRecovery: { getRecoverableCol },
} = require("@statescan/mongo");

async function recoverables(_, _args) {
  const { offset, limit } = _args;
  if (parseInt(limit) > 100) {
    throw new Error("Over max page size 100");
  }

  const col = await getRecoverableCol();
  const recoverables = await col
    .find({}, { projection: { _id: 0 } })
    .sort({ height: -1 })
    .skip(offset)
    .limit(limit)
    .toArray();
  const total = await col.estimatedDocumentCount();

  return {
    items: recoverables,
    offset,
    limit,
    total,
  };
}

module.exports = { recoverables };
