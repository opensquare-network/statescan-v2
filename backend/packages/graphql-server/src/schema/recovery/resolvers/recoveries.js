const {
  palletRecovery: { getRecoveryCol },
} = require("@statescan/mongo");

async function recoveries(_, _args) {
  const { offset, limit } = _args;
  if (parseInt(limit) > 100) {
    throw new Error("Over max page size 100");
  }

  const col = await getRecoveryCol();
  const recoveries = await col
    .find({}, { projection: { _id: 0 } })
    .sort({ created: -1 })
    .skip(offset)
    .limit(limit)
    .toArray();
  const total = await col.estimatedDocumentCount();

  return {
    items: recoveries,
    offset,
    limit,
    total,
  };
}

module.exports = {
  recoveries,
};
