const { getProxySection } = require("../../common/section");
const { queryAllProxiesOf } = require("../../common/query");
const {
  store: { setKnownHeightMark },
} = require("@statescan/common");
const {
  palletProxy: {
    getAllActiveProxiesOfDelegator,
    getProxyTimelineCol,
    getProxyCol,
  },
} = require("@statescan/mongo");
const {
  chain: { getBlockHash },
  logger,
} = require("@osn/scan-common");
const { getAllProxyIds } = require("./common/proxyIds");

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
  const { proxies: nowOnChainProxies } = await queryAllProxiesOf(
    signer,
    extrinsicIndexer.blockHash,
  );
  const proxyIdsAtCurBlock = getAllProxyIds(signer, nowOnChainProxies);
  const proxiesInDb = await getAllActiveProxiesOfDelegator(signer);
  const proxyIdsInDb = proxiesInDb.map((proxy) => proxy.proxyId);
  logDifference(proxyIdsAtPreBlock, proxyIdsInDb, extrinsicIndexer);

  if (proxyIdsAtCurBlock.length > 0) {
    // it means this call is failed
    return;
  }

  const proxyCol = await getProxyCol();
  const proxyBulk = proxyCol.initializeUnorderedBulkOp();
  for (const proxyId of proxyIdsAtPreBlock) {
    proxyBulk
      .find({ proxyId })
      .updateOne({ $set: { isRemoved: true, removedAt: extrinsicIndexer } });
  }
  if (proxyBulk.length > 0) {
    await proxyBulk.execute();
  }

  const timelineCol = await getProxyTimelineCol();
  const timelineBulk = timelineCol.initializeUnorderedBulkOp();
  for (const proxyId of proxyIdsAtPreBlock) {
    timelineBulk.insert({
      proxyId,
      name: "ProxyRemoved",
      args: {},
      indexer: extrinsicIndexer,
    });
  }

  if (timelineBulk.length > 0) {
    await timelineBulk.execute();
  }
}

module.exports = {
  handleRemoveProxies,
};
