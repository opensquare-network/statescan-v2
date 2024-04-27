require("dotenv").config();

const {
  chain: { getApi, subscribeChainHeight, getLatestHeight, getBlockIndexer },
} = require("@osn/scan-common");
const { u8aToHex } = require("@polkadot/util");
const { updateBlockIdentities } = require("../../scan/jobs/block/accounts");
const { addBlockAccount } = require("../../store/account");
const { indexer } = require("@statescan/common/src/graphql/types");

async function queryEntries(api, startKey, num = 100) {
  return api.query.identity.identityOf.entriesPaged({
    args: [],
    pageSize: num,
    startKey,
  });
}

(async () => {
  await subscribeChainHeight();
  const api = await getApi();
  const blockHeight = getLatestHeight();
  const blockHash = await api.rpc.chain.getBlockHash(blockHeight);
  const block = await api.rpc.chain.getBlock(blockHash);
  const indexer = getBlockIndexer(block.block);

  let total = 0;
  let startKey = null;
  let entries = await queryEntries(api, startKey, 100);
  while (entries.length > 0) {
    const accounts = entries.map(([key]) => key.args[0].toString());
    for (const account of accounts) {
      addBlockAccount(indexer.blockHash, account);
    }
    await updateBlockIdentities(indexer);
    total += entries.length;
    console.log(`Update ${total} accounts`);

    startKey = u8aToHex(entries[entries.length - 1][0]);
    entries = await queryEntries(api, startKey, 100);
  }

  process.exit(0);
})();
