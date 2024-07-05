const {
  palletProxy: { getProxyCol },
} = require("@statescan/mongo");

async function proxy(_, _args) {
  const { proxyId } = _args;
  const col = await getProxyCol();
  return await col.findOne({ proxyId }, { projection: { _id: 0 } });
}

module.exports = {
  proxy,
};
