const {
  palletProxy: { getProxyCol },
} = require("@statescan/mongo");
const isNil = require("lodash.isnil");
const isEmpty = require("lodash.isempty");

async function proxies(_, _args) {
  const { delegator, delegatee, isPure, isActive, offset, limit } = _args;
  if (parseInt(limit) > 100) {
    throw new Error("Over max page size 100");
  }

  let q = {};
  if (delegator) {
    Object.assign(q, { delegator });
  }
  if (delegatee) {
    Object.assign(q, { delegatee });
  }
  if (!isNil(isPure)) {
    Object.assign(q, { isPure });
  }
  if (!isNil(isActive)) {
    Object.assign(q, { isRemoved: !isActive });
  }

  const col = await getProxyCol();
  const items = await col
    .find(q, { projection: { _id: 0 } })
    .sort({ "indexer.blockHeight": -1 })
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
    items,
    offset,
    limit,
    total,
  };
}

module.exports = {
  proxies,
};
