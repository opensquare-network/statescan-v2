const { getProxySection } = require("../../common");
const {
  chain: { getBlockHash, getApi },
} = require("@osn/scan-common");
const { queryAllProxiesOf } = require("../../common");
const { generateProxyId } = require("../../common/hash");
const {
  palletProxy: { markProxyRemoved, getProxyTimelineCol },
} = require("@statescan/mongo");
const {
  store: { setKnownHeightMark },
} = require("@statescan/common");

async function queryPureCreatedEvent(height, extIndex) {
  const api = await getApi();
  const blockHash = await getBlockHash(height);
  const allEvents = await api.query.system.events.at(blockHash);

  return allEvents.find(({ event, phase }) => {
    if (phase.isNone || (phase.value && phase.value.toNumber() !== extIndex)) {
      return false;
    }

    const { section, method } = event;
    return (
      section === getProxySection() &&
      ["PureCreated", "AnonymousCreated"].includes(method)
    );
  });
}

async function getPureProxyOn(pure, delegatee, type, delay, height) {
  const blockHash = await getBlockHash(height);
  const { proxies } = await queryAllProxiesOf(pure, blockHash);
  return proxies.find(
    (p) =>
      p.delegate === delegatee && p.proxyType === type && p.delay === delay,
  );
}

async function handleKillPure(call, signer, extrinsicIndexer) {
  const { section, method } = call;
  if (
    getProxySection() !== section ||
    !["killPure", "killAnonymous"].includes(method)
  ) {
    return;
  }
  setKnownHeightMark(extrinsicIndexer.blockHeight);

  const spawner = call.args[0].toString();
  const proxyTypeArg = call.args[1].toString();
  const height = call.args[3].toNumber();
  const extIndex = call.args[4].toNumber();

  const createdEvent = await queryPureCreatedEvent(height, extIndex);
  if (!createdEvent) {
    return;
  }

  const pure = createdEvent.event.data[0].toString();
  const delay = createdEvent.event.data[3].toNumber();

  const preBlockHeight = extrinsicIndexer.blockHeight - 1;
  const preBlockHash = await getBlockHash(preBlockHeight);
  const { proxies: preBlockProxies } = await queryAllProxiesOf(
    pure,
    preBlockHash,
  );
  const proxy = preBlockProxies.find(
    (p) =>
      p.delegate === spawner &&
      p.proxyType === proxyTypeArg &&
      p.delay === delay,
  );
  if (!proxy) {
    // check there is proxy on previous height block
    return;
  }
  const { proxies: nowProxies } = await queryAllProxiesOf(
    pure,
    extrinsicIndexer.blockHash,
  );
  if (nowProxies.length !== 0) {
    // check this proxy is killed on current height
    return;
  }

  const timelineCol = await getProxyTimelineCol();
  for (const p of preBlockProxies) {
    const { delegate, proxyType, delay } = p;
    const proxyId = generateProxyId(pure, delegate, proxyType, delay);
    await markProxyRemoved(proxyId, extrinsicIndexer);

    await timelineCol.insertOne({
      proxyId,
      name: "Killed",
      args: {},
      indexer: extrinsicIndexer,
    });
  }
}

module.exports = {
  handleKillPure,
};
