require("dotenv").config();

const {
  chain: { getApi, subscribeChainHeight, getLatestHeight, getBlockIndexer },
} = require("@osn/scan-common");
const { u8aToHex } = require("@polkadot/util");
const { updateBlockIdentities } = require("../../scan/jobs/block/accounts");
const { addBlockAccount } = require("../../store/account");
const {
  identity: { getIdentityCol, getIdentityTimelineCol },
} = require("@statescan/mongo");

async function queryEntries(api, startKey, num = 100) {
  return api.query.identity.identityOf.entriesPaged({
    args: [],
    pageSize: num,
    startKey,
  });
}

async function updateIdentityLatestUpdate(bulk, account) {
  const timelineCol = await getIdentityTimelineCol();
  const timeline = await timelineCol
    .find({ account }, { projection: { _id: 0, indexer: 1 } })
    .sort({ "indexer.blockHeight": -1 })
    .toArray();
  if (timeline.length > 0) {
    const indexer = timeline[0].indexer;
    bulk.find({ account }).updateOne({ $set: { lastUpdate: indexer } });
  }
}

(async () => {
  await subscribeChainHeight();
  const api = await getApi();
  const blockHeight = getLatestHeight();
  const blockHash = await api.rpc.chain.getBlockHash(blockHeight);
  const block = await api.rpc.chain.getBlock(blockHash);
  const indexer = getBlockIndexer(block.block);
  const col = await getIdentityCol();

  let total = 0;
  let startKey = null;
  let entries = await queryEntries(api, startKey, 100);
  while (entries.length > 0) {
    const accounts = entries.map(([key]) => key.args[0].toString());
    for (const account of accounts) {
      addBlockAccount(indexer.blockHash, account);
    }
    await updateBlockIdentities(indexer);

    const bulk = col.initializeUnorderedBulkOp();
    const promises = [];
    for (const account of accounts) {
      promises.push(updateIdentityLatestUpdate(bulk, account));
    }
    await Promise.all(promises);
    if (bulk.length > 0) {
      await bulk.execute();
    }

    total += entries.length;
    console.log(`Update ${total} accounts`);

    startKey = u8aToHex(entries[entries.length - 1][0]);
    entries = await queryEntries(api, startKey, 100);
  }

  process.exit(0);
})();
