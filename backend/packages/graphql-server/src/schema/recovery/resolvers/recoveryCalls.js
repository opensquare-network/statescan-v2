const {
  palletRecovery: { getRecoveredCallCol, getRecoveryTimelineCol },
} = require("@statescan/mongo");

async function recoveryCalls(_, _args) {
  const { lostAccount, rescuerAccount, recoveryCreatedAt, offset, limit } =
    _args;

  const timelineCol = await getRecoveryTimelineCol();
  const items = await timelineCol
    .find(
      {
        lostAccount,
        rescuerAccount,
        name: "AccountRecovered",
        "indexer.blockHeight": { $gte: recoveryCreatedAt },
      },
      { projection: { _id: 0 } },
    )
    .sort({ "indexer.blockHeight": -1 })
    .limit(2)
    .toArray();
  if (items.length <= 0) {
    return {
      items: [],
      offset,
      limit,
      total: 0,
    };
  }

  let q = { lostAccount, rescuer: rescuerAccount };
  if (items.length === 1) {
    Object.assign(q, {
      "indexer.blockHeight": { $gte: items[0].indexer.blockHeight },
    });
  } else if (items.length === 2) {
    Object.assign(q, {
      $and: [
        { "indexer.blockHeight": { $gte: items[0].indexer.blockHeight } },
        { "indexer.blockHeight": { $lt: items[1].indexer.blockHeight } },
      ],
    });
  }

  const col = await getRecoveredCallCol();
  const calls = await col
    .find(q, { projection: { _id: 0 } })
    .sort({ "indexer.blockHeight": 1 })
    .skip(offset)
    .limit(limit)
    .toArray();
  const total = await col.countDocuments(q);

  return {
    items: calls,
    offset,
    limit,
    total,
  };
}

module.exports = {
  recoveryCalls,
};
