const {
  palletProxy: { getProxyCallCol },
} = require("@statescan/mongo");
const { normalizeProxyCall } = require("./common");

async function proxyCalls(_, _args) {
  const { proxyId, offset, limit } = _args;
  const col = await getProxyCallCol();
  const q = { proxyId };
  const items = await col
    .find(q, { projection: { _id: 0 } })
    .sort({ "indexer.blockHeight": -1 })
    .skip(offset)
    .limit(limit)
    .toArray();
  const total = await col.countDocuments(q);

  return {
    items: items.map(normalizeProxyCall),
    offset,
    limit,
    total,
  };
}

module.exports = {
  proxyCalls,
};
