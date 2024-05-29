const { getRecoverySection } = require("../common/section");
const {
  palletRecovery: { getProxyCol },
} = require("@statescan/mongo");
const {
  chain: { getApi, getLatestFinalizedHeight },
} = require("@osn/scan-common");
const { u8aToHex } = require("@polkadot/util");
const {
  hasProxyHeightMark,
  clearProxyHeightMark,
} = require("../../store/proxy");

async function queryEntries(api, startKey, num = 1000) {
  const section = getRecoverySection();
  return api.query[section].proxy.entriesPaged({
    args: [],
    pageSize: num,
    startKey,
  });
}

async function updateRecoveryProxies() {
  const api = await getApi();

  const col = await getProxyCol();
  const bulk = col.initializeOrderedBulkOp();
  bulk.find({}).delete();

  let startKey = null;
  let entries = await queryEntries(api, startKey, 1000);
  while (entries.length > 0) {
    for (const [storageKey, value] of entries) {
      const rescuer = storageKey.args[0].toString();
      if (value.isSome) {
        const lost = value.unwrap().toString();
        bulk.insert({ rescuer, lost });
      }
    }

    startKey = u8aToHex(entries[entries.length - 1][0]);
    entries = await queryEntries(api, startKey, 100);
  }

  await bulk.execute();
}

async function updateRecoverProxiesConditional(indexer) {
  const finalizedHeight = getLatestFinalizedHeight();
  if (hasProxyHeightMark(indexer.blockHeight)) {
    await updateRecoveryProxies();
    clearProxyHeightMark(indexer.blockHeight);
  } else if (
    indexer.blockHeight > finalizedHeight - 100 &&
    finalizedHeight % 10000 === 0
  ) {
    await updateRecoveryProxies();
  }
}

module.exports = {
  updateRecoveryProxies,
  updateRecoverProxiesConditional,
};
