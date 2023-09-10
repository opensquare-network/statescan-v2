const {
  identity: { getRequestCol },
} = require("@statescan/mongo");
const isNil = require("lodash.isnil");
const trim = require("lodash.trim");

async function findRequests(_args) {
  const { offset, limit, registrarIndex, search, sort, status } = _args;

  let q = {};
  if (!isNil(registrarIndex)) {
    q.registrarIndex = registrarIndex;
  }

  const trimmedAccount = trim(search); // has been checked by upper logic
  if (trimmedAccount) {
    q.account = trimmedAccount;
  }

  const querySort = {};
  if (sort === "REQUEST_HEIGHT_ASC") {
    Object.assign(querySort, { requestHeight: 1 });
  } else if (sort === "REQUEST_HEIGHT_DESC") {
    Object.assign(querySort, { requestHeight: -1 });
  } else {
    Object.assign(querySort, { "status.indexer.blockHeight": -1 });
  }

  if (status) {
    Object.assign(q, { "status.name": status.toLowerCase() });
  }

  const col = await getRequestCol();
  const requests = await col
    .find(q, { projection: { _id: 0 } })
    .sort(querySort)
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
  findRequests,
};
