const {
  palletRecovery: { getRecoveryCol },
} = require("@statescan/mongo");
const isNil = require("lodash.isnil");
const isEmpty = require("lodash.isempty");

async function recoveries(_, _args) {
  const { offset, limit, lostAccount, active } = _args;
  if (parseInt(limit) > 100) {
    throw new Error("Over max page size 100");
  }

  let q = {};
  if (lostAccount) {
    Object.assign(q, { lostAccount });
  }
  if (!isNil(active)) {
    Object.assign(q, { isClosed: !active });
  }

  const col = await getRecoveryCol();
  const recoveries = await col
    .find(q, { projection: { _id: 0 } })
    .sort({ created: -1 })
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
    items: recoveries,
    offset,
    limit,
    total,
  };
}

module.exports = {
  recoveries,
};
