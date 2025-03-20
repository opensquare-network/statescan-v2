require("dotenv").config();
const {
  foreignAsset: { getAssetCol },
} = require("@statescan/mongo");
const {
  chain: { getApi, findBlockApi, getBlockIndexer },
} = require("@osn/scan-common");
const {
  queryAndInsertAsset,
} = require("../../scan/common/queryAndInsertAsset");
const { queryAndSaveAllHolders } = require("../../scan/common/account");

(async () => {
  const col = await getAssetCol();
  const total = await col.estimatedDocumentCount();
  if (total > 0) {
    console.log(`there are ${total} records in DB. Please remove them first`);
    return;
  }

  // const blockHeight = 3323988;
  const blockHash =
    "0x6736705e150f8223c6e8200eb07aa9bba48a52df0fb0d1e3291ceb3db1cdd72f";
  const api = await getApi();
  const block = await api.rpc.chain.getBlock(blockHash);
  const indexer = getBlockIndexer(block.block);
  const blockApi = await findBlockApi(blockHash);
  const entries = await blockApi.query.foreignAssets.asset.entries();
  for (const [storageKey] of entries) {
    const arg = storageKey.args[0];
    const hash = arg.hash.toString();
    const location = storageKey.args[0].toJSON();

    await queryAndInsertAsset(hash, location, indexer);
    await queryAndSaveAllHolders(hash, location, indexer);
  }

  process.exit(0);
})();
