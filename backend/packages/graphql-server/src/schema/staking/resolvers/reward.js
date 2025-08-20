const {
  palletStaking: { getStakingRewardCol },
} = require("@statescan/mongo");
const isEmpty = require("lodash.isempty");

async function reward(_, _args) {
  const { offset, limit, address } = _args;
  if (parseInt(limit) > 100) {
    throw new Error("Over max page size 100");
  }

  const q = {};
  if (address) {
    Object.assign(q, { who: address });
  }

  const col = await getStakingRewardCol();
  const rewards = await col
    .find(q, { projection: { _id: 0 } })
    .sort({ "indexer.blockHeight": -1, who: 1 })
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
    rewards,
    offset,
    limit,
    total,
  };
}

module.exports = {
  reward,
};
