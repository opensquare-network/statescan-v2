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
  store: { setKnownHeightMark, getBlockEvents },
} = require("@statescan/common");

function hasPureKilledEvent(blockHeight) {
  const allBlockEvents = getBlockEvents(blockHeight);
  return allBlockEvents.some((e) => e.event.method === "PureKilled");
}

async function queryPureCreatedEvent(height, extIndex) {
  const api = await getApi();
  const blockHash = await getBlockHash(height);
  if (blockHash.isEmpty) {
    return null;
  }

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

async function handleKillPure(call, signer, extrinsicIndexer) {
  const { section, method } = call;
  if (
    getProxySection() !== section ||
    !["killPure", "killAnonymous"].includes(method)
  ) {
    return;
  }
  setKnownHeightMark(extrinsicIndexer.blockHeight);

  if (hasPureKilledEvent(extrinsicIndexer.blockHeight)) {
    // handle this call only there are no PureKilled events
    return;
  }

  const height = call.args[3].toNumber();
  const extIndex = call.args[4].toNumber();

  const createdEvent = await queryPureCreatedEvent(height, extIndex);
  if (!createdEvent) {
    return;
  }

  const preBlockHeight = extrinsicIndexer.blockHeight - 1;
  const preBlockHash = await getBlockHash(preBlockHeight);
  const pure = signer;
  const { proxies: preBlockProxies } = await queryAllProxiesOf(
    pure,
    preBlockHash,
  );
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
