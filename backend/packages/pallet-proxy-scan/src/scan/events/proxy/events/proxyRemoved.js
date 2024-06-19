const { generateProxyId } = require("../../../common/hash");
const {
  palletProxy: { markProxyRemoved },
} = require("@statescan/mongo");

async function handleProxyRemoved(event, indexer) {
  const delegator = event.data[0].toString();
  const delegatee = event.data[1].toString();
  const type = event.data[2].toString();
  const delay = event.data[3].toNumber();
  const proxyId = generateProxyId(delegator, delegatee, type, delay);
  await markProxyRemoved(proxyId, indexer);

  // todo: insert timeline
}

module.exports = {
  handleProxyRemoved,
};
