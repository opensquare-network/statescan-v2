const {
  identity: { getIdentityCol },
} = require("@statescan/mongo");

async function identities(_, _args) {
  const { offset, limit } = _args;
  const col = await getIdentityCol();
  return await col
    .find({}, { projection: { _id: 0 } })
    .sort({ "lastUpdate.blockHeight": -1 })
    .skip(offset)
    .limit(limit)
    .toArray();
}

module.exports = {
  identities,
};
