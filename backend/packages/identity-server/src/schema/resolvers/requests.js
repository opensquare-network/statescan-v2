const {
  identity: { getRequestCol },
} = require("@statescan/mongo");
const isNil = require("lodash.isnil");

async function requests(_, _args) {
  const { registrarIndex, account, offset, limit } = _args;
  let q = {};
  if (!isNil(registrarIndex)) {
    q.registrarIndex = registrarIndex;
  }

  if (account) {
    q.account = account;
  }

  const col = await getRequestCol();
  const requests = await col
    .find(q, { projection: { _id: 0 } })
    .skip(offset)
    .limit(limit)
    .toArray();
  const total = await col.countDocuments(q);

  return {
    requests,
    offset,
    limit,
    total,
  };
}

module.exports = {
  requests,
};
