const {
  palletRecovery: { getRecoverableCol },
} = require("@statescan/mongo");
const isNil = require("lodash.isnil");
const isEmpty = require("lodash.isempty");

async function recoverables(_, _args) {
  const { lostAccount, active, offset, limit } = _args;
  if (parseInt(limit) > 100) {
    throw new Error("Over max page size 100");
  }

  let q = {};
  if (lostAccount) {
    Object.assign(q, { who: lostAccount });
  }
  if (!isNil(active)) {
    Object.assign(q, { isActive: active });
  }

  const col = await getRecoverableCol();
  const recoverables = await col
    .find(q, { projection: { _id: 0 } })
    .sort({ height: -1 })
    .skip(offset)
    .limit(limit)
    .toArray();

  let total;
  if (isEmpty(q)) {
    total = await col.estimatedDocumentCount();
  } else {
    total = await col.countDocuments(q);
  }

  return {
    items: recoverables,
    offset,
    limit,
    total,
  };
}

module.exports = { recoverables };
