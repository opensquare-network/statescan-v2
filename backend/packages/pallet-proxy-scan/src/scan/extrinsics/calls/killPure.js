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
    return section === getProxySection() && method === "PureCreated";
  });
}

async function getPureProxyOn(pure, height) {
  const blockHash = await getBlockHash(height);
  const { proxies } = await queryAllProxiesOf(pure, blockHash);
  if (proxies.length <= 0) {
    return null;
  }

  return proxies[0];
}

async function handleKillPure(call, signer, extrinsicIndexer) {
  const { section, method } = call;
  if (getProxySection() !== section || "killPure" !== method) {
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
  const proxy = await getPureProxyOn(pure, extrinsicIndexer.blockHeight - 1);
  const { delegate, proxyType, delay } = proxy || {};
  if (!proxy || delegate !== spawner || proxyType !== proxyTypeArg) {
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

  const proxyId = generateProxyId(pure, delegate, proxyType, delay);
  await markProxyRemoved(proxyId, extrinsicIndexer);

  const timelineCol = await getProxyTimelineCol();
  await timelineCol.insertOne({
    proxyId,
    name: "Killed",
    args: {},
    indexer: extrinsicIndexer,
  });
}

module.exports = {
  handleKillPure,
};
