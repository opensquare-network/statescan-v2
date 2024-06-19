const { generateProxyId } = require("../../../common/hash");
const {
  palletProxy: { insertProxyIfNo },
} = require("@statescan/mongo");

async function handleProxyAdded(event, indexer) {
  const delegator = event.data[0].toString();
  const delegatee = event.data[1].toString();
  const type = event.data[2].toString();
  const delay = event.data[3].toNumber();
  const proxyId = generateProxyId(delegator, delegatee, type, delay);

  await insertProxyIfNo({
    proxyId,
    delegator,
    delegatee,
    type,
    delay,
    isRemoved: false,
    indexer,
  });
  // todo: insert timeline
}

module.exports = {
  handleProxyAdded,
};
