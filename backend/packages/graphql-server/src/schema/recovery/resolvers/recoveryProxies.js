const {
  palletRecovery: { getProxyCol },
} = require("@statescan/mongo");

async function recoveryProxies(_, _args) {
  const { offset, limit } = _args;
  if (parseInt(limit) > 100) {
    throw new Error("Over max page size 100");
  }

  const col = await getProxyCol();
  const items = await col
    .find({}, { projection: { _id: 0 } })
    .sort({ lost: 1 })
    .skip(offset)
    .limit(limit)
    .toArray();
  const total = await col.estimatedDocumentCount();

  return {
    items,
    offset,
    limit,
    total,
  };
}

module.exports = {
  recoveryProxies,
};
