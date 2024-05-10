const {
  vesting: { getVestingCol },
} = require("@statescan/mongo");
const isEmpty = require("lodash.isempty");

async function vestings(_, _args) {
  const { offset, limit, address } = _args;
  if (parseInt(limit) > 100) {
    throw new Error("Over max page size 100");
  }

  const q = {};
  if (address) {
    Object.assign(q, { address });
  }

  const col = await getVestingCol();
  const vestings = await col
    .find(q, { projection: { _id: 0 } })
    .sort({ startingBlock: -1, address: 1 })
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
    vestings,
    offset,
    limit,
    total,
  };
}

module.exports = {
  vestings,
};
