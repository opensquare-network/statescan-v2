const { getProxyCol } = require("./db");

async function upsertProxyIfNo(obj) {
  const { proxyId } = obj;
  const col = await getProxyCol();
  const maybeInDb = await col.findOne(
    { proxyId },
    { projection: { proxyId: 1 } },
  );
  if (maybeInDb) {
    await col.updateOne({ proxyId }, { $set: { isRemoved: false } });
  } else {
    await col.insertOne(obj);
  }
}

async function markProxyRemoved(proxyId, indexer) {
  const col = await getProxyCol();
  await col.updateOne(
    { proxyId },
    { $set: { isRemoved: true, removedAt: indexer } },
  );
}

module.exports = {
  upsertProxyIfNo,
  markProxyRemoved,
};
