const { generateProxyId } = require("../../../common/hash");
const {
  palletProxy: { upsertProxyIfNo, getProxyTimelineCol, isPureProxyDelegator },
} = require("@statescan/mongo");

async function handleProxyAdded(event, indexer) {
  const delegator = event.data[0].toString();
  const delegatee = event.data[1].toString();
  const type = event.data[2].toString();
  const delay = event.data[3].toNumber();
  const proxyId = generateProxyId(delegator, delegatee, type, delay);

  const isPure = await isPureProxyDelegator(delegator);
  await upsertProxyIfNo({
    proxyId,
    delegator,
    delegatee,
    type,
    delay,
    isRemoved: false,
    isPure,
    indexer,
  });

  const timelineCol = await getProxyTimelineCol();
  await timelineCol.insertOne({
    proxyId,
    name: event.method,
    args: {
      delegator,
      delegatee,
      type,
      delay,
    },
    indexer,
  });
}

module.exports = {
  handleProxyAdded,
};
