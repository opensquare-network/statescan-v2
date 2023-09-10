const {
  identity: { getRequestCol },
} = require("@statescan/mongo");
const trim = require("lodash.trim");
const isNil = require("lodash.isnil");

const lookup = {
  $lookup: {
    from: "identity",
    localField: "account",
    foreignField: "account",
    as: "identity",
  },
};

const unwind = { $unwind: "$identity" };
const project = { $project: { identity: 0 } };

async function getRequestsWithAggregation(_args) {
  const { offset, limit, registrarIndex, search, sort, status } = _args;

  const trimmedSearch = trim(search);
  const matchFields = {
    "identity.fullDisplay": new RegExp(trimmedSearch, "i"),
  };
  if (!isNil(registrarIndex)) {
    Object.assign(matchFields, { registrarIndex });
  }
  if (status) {
    Object.assign(matchFields, { "status.name": status.toLowerCase() });
  }
  const match = { $match: matchFields };

  const querySort = { $sort: { "status.indexer.blockHeight": -1 } };
  if (sort === "REQUEST_HEIGHT_ASC") {
    Object.assign(querySort, { $sort: { requestHeight: 1 } });
  } else if (sort === "REQUEST_HEIGHT_DESC") {
    Object.assign(querySort, { $sort: { requestHeight: -1 } });
  }

  const operations = [
    lookup,
    unwind,
    match,
    querySort,
    { $skip: offset },
    { $limit: limit },
    project,
  ];
  const countOperations = [lookup, unwind, match];

  const col = await getRequestCol();
  const requests = await col.aggregate(operations).toArray();
  const count = await col
    .aggregate([...countOperations, { $count: "total" }])
    .toArray();
  return {
    requests,
    offset,
    limit,
    total: count.length ? count[0].total : 0,
  };
}

module.exports = {
  getRequestsWithAggregation,
};
