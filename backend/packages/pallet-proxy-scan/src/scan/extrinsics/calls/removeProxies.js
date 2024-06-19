const { getProxySection } = require("../../common/section");
const { generateProxyId } = require("../../common/hash");
const { queryAllProxiesOf } = require("../../common/query");
const {
  store: { setKnownHeightMark },
} = require("@statescan/common");
const {
  palletProxy: {
    getAllActiveProxiesOfDelegator,
    markAllActiveProxiesAsRemoved,
    getProxyTimelineCol,
  },
} = require("@statescan/mongo");
const {
  chain: { getBlockHash },
  logger,
} = require("@osn/scan-common");

function getAllProxyIds(delegator, proxies) {
  return proxies.map((definition) => {
    const { delegate, proxyType, delay } = definition;
    return generateProxyId(delegator, delegate, proxyType, delay);
  });
}

function logDifference(preProxyIds, dbProxyIds, indexer) {
  const preIdSet = new Set(preProxyIds);
  const dbIdSet = new Set(dbProxyIds);
  for (const id of dbIdSet) {
    if (!preIdSet.has(id)) {
      logger.error(
        `Can not find DB proxy id ${id} from on chain at ${indexer.blockHeight}`,
      );
    }
  }

  for (const id of preIdSet) {
    if (!dbIdSet.has(id)) {
      logger.error(
        `Can not find on chain proxy id ${id} from DB at ${indexer.blockHeight}`,
      );
    }
  }
}

async function handleRemoveProxies(call, signer, extrinsicIndexer) {
  const { section, method } = call;
  if (getProxySection() !== section || "removeProxies" !== method) {
    return;
  }

  setKnownHeightMark(extrinsicIndexer.blockHeight);

  const { proxies } = await queryAllProxiesOf(
    signer,
    await getBlockHash(extrinsicIndexer.blockHeight - 1),
  );
  const proxyIdsAtPreBlock = getAllProxyIds(signer, proxies);
  const proxiesInDb = await getAllActiveProxiesOfDelegator(signer);
  const proxyIdsInDb = proxiesInDb.map((proxy) => proxy.proxyId);
  logDifference(proxyIdsAtPreBlock, proxyIdsInDb, extrinsicIndexer);

  await markAllActiveProxiesAsRemoved(signer, extrinsicIndexer);

  const timelineCol = await getProxyTimelineCol();
  const bulk = timelineCol.initializeUnorderedBulkOp();
  for (const proxyId of proxyIdsInDb) {
    bulk.insert({
      proxyId,
      name: "ProxyRemoved",
      args: {},
      indexer: extrinsicIndexer,
    });
  }

  if (bulk.length > 0) {
    await bulk.execute();
  }
}

module.exports = {
  handleRemoveProxies,
};
