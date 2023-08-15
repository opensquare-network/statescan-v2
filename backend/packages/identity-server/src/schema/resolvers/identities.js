const {
  identity: { getIdentityCol },
} = require("@statescan/mongo");

async function identities(_, _args) {
  const { offset, limit } = _args;
  const col = await getIdentityCol();
  const identities = await col
    .find({}, { projection: { _id: 0 } })
    .sort({ lastUpdate: -1 })
    .skip(offset)
    .limit(limit)
    .toArray();
  const total = await col.countDocuments({});

  return {
    identities,
    offset,
    limit,
    total,
  };
}

module.exports = {
  identities,
};
