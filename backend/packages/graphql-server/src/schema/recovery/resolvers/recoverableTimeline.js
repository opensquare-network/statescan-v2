const {
  palletRecovery: { getRecoverableTimelineCol },
} = require("@statescan/mongo");

async function recoverableTimeline(_, _args) {
  const { recoverableHeight, lostAccount, offset, limit } = _args;
  if (parseInt(limit) > 100) {
    throw new Error("Over max page size 100");
  }

  const col = await getRecoverableTimelineCol();
  const q = { recoverableHeight, who: lostAccount };
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

module.exports = {
  recoverableTimeline,
};
