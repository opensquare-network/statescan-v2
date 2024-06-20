require("dotenv").config();

const {
  chain: { getApi, setSpecHeights, subscribeFinalizedHeight },
} = require("@osn/scan-common");
const { handleBlock } = require("./scan");
const {
  palletProxy: { initPalletProxyScanDb },
} = require("@statescan/mongo");

(async () => {
  await initPalletProxyScanDb();
  await subscribeFinalizedHeight();
  const blockHeights = [10966643, 10967652, 10967654, 10967656, 10967673];

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
