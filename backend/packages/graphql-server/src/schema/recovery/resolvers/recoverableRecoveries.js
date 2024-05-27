const {
  palletRecovery: { getRecoverableCol, getRecoveryCol },
} = require("@statescan/mongo");

async function recoverableRecoveries(_, _args) {
  const { recoverableHeight, lostAccount, offset, limit } = _args;

  const recoverableCol = await getRecoverableCol();
  const recoverable = await recoverableCol.findOne({
    height: recoverableHeight,
    who: lostAccount,
  });
  if (!recoverable) {
    return {
      items: [],
      offset,
      limit,
      total: 0,
    };
  }

  let q = { lostAccount, created: { $gte: recoverableHeight } };
  if (recoverable.removedAt) {
    q = {
      $and: [
        { lostAccount },
        { created: { $gte: recoverableHeight } },
        { created: { $lt: recoverable.removedAt.blockHeight } },
      ],
    };
  }

  const recoveryCol = await getRecoveryCol();
  const items = await recoveryCol
    .find(q, { projection: { _id: 0 } })
    .sort({ "indexer.blockHeight": -1 })
    .skip(offset)
    .limit(limit)
    .toArray();
  const total = await recoveryCol.countDocuments(q);

  return {
    items,
    offset,
    limit,
    total,
  };
}

module.exports = {
  recoverableRecoveries,
};
