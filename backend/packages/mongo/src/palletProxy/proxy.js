const { getProxyCol } = require("./db");

async function insertProxyIfNo(obj) {
  const { proxyId } = obj;
  const col = await getProxyCol();
  const maybeInDb = await col.findOne(
    { proxyId },
    { projection: { proxyId: 1 } },
  );
  if (maybeInDb) {
    return;
  }

  await col.insertOne(obj);
}

async function markProxyRemoved(proxyId, indexer) {
  const col = await getProxyCol();
  await col.findOne(
    { proxyId },
    { $set: { isRemoved: true, removedAt: indexer } },
  );
}

module.exports = {
  insertProxyIfNo,
  markProxyRemoved,
};
