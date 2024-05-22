const {
  palletRecovery: { getRecoveredCallCol },
} = require("@statescan/mongo");

async function recoverableCalls(_, _args) {
  const { recoverableHeight, lostAccount, offset, limit } = _args;

  const col = await getRecoveredCallCol();
  const q = { recoverableHeight, lostAccount };
  const items = await col
    .find(q, { projection: { _id: 0 } })
    .sort({ "indexer.blockHeight": -1 })
    .skip(offset)
    .limit(limit)
    .toArray();
  const total = await col.countDocuments(q);

  return {
    items,
    offset,
    limit,
    total,
  };
}

module.exports = {
  recoverableCalls,
};
