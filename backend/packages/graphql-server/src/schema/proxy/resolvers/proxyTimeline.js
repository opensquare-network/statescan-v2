const {
  palletProxy: { getProxyTimelineCol },
} = require("@statescan/mongo");

async function proxyTimeline(_, _args) {
  const { proxyId } = _args;
  const col = await getProxyTimelineCol();
  return await col
    .find({ proxyId }, { projection: { _id: 0 } })
    .sort({ "indexer.blockHeight": 1 })
    .toArray();
}

module.exports = {
  proxyTimeline,
};
