require("dotenv").config();

const {
  chain: { getApi, setSpecHeights, subscribeFinalizedHeight },
} = require("@osn/scan-common");
const { handleBlock } = require("./scan");
const {
  foreignAsset: { initForeignAssetScanDb },
} = require("@statescan/mongo");

(async () => {
  await initForeignAssetScanDb();
  await subscribeFinalizedHeight();
  const blockHeights = [6707383, 8443070];
  const api = await getApi();

  for (const height of blockHeights) {
    await setSpecHeights([height - 1]);
    const blockHash = await api.rpc.chain.getBlockHash(height);
    const block = await api.rpc.chain.getBlock(blockHash);
    const allEvents = await api.query.system.events.at(blockHash);

    await handleBlock({
      height,
      block: block.block,
      events: allEvents,
    });
    console.log(`${height} finished`);
  }

  console.log("finished");
  process.exit(0);
})();
