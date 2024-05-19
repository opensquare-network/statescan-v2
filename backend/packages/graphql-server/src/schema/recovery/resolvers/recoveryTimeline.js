const {
  palletRecovery: { getRecoveryTimelineCol },
} = require("@statescan/mongo");

async function recoveryTimeline(_, _args) {
  const { lostAccount, rescuerAccount, created, offset, limit } = _args;
  if (parseInt(limit) > 100) {
    throw new Error("Over max page size 100");
  }

  const col = await getRecoveryTimelineCol();
  const q = { lostAccount, rescuerAccount, created };
  const items = await col
    .find(q, { projection: { _id: 0 } })
    .sort({ "indexer.blockHeight": 1 })
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

module.exports = { recoveryTimeline };
