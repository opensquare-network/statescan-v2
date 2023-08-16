const {
  identity: { getIdentityCol },
} = require("@statescan/mongo");
const {
  utils: { isValidAddress },
} = require("@statescan/common");
const trim = require("lodash.trim");

async function identities(_, _args) {
  const { offset, limit, search = "" } = _args;
  const trimmedSearch = trim(search);
  let q;
  if (!trimmedSearch) {
    q = {};
  } else if (isValidAddress(trimmedSearch)) {
    q = { account: trimmedSearch };
  } else {
    q = { fullDisplay: new RegExp(trimmedSearch, "i") };
  }

  const col = await getIdentityCol();
  const identities = await col
    .find(q, { projection: { _id: 0 } })
    .sort({ "lastUpdate.blockHeight": -1 })
    .skip(offset)
    .limit(limit)
    .toArray();
  const total = await col.countDocuments(q);

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
