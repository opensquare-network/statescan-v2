require("dotenv").config();

const {
  chain: { getApi, setSpecHeights, subscribeFinalizedHeight },
} = require("@osn/scan-common");
const { handleBlock } = require("./scan");
const {
  palletRecovery: { initPalletRecoveryScanDb },
} = require("@statescan/mongo");

(async () => {
  await initPalletRecoveryScanDb();
  await subscribeFinalizedHeight();
  const blockHeights = [
    1175839, 1175941, 1175959, 1175970, 1175999, 1176060, 1176066,
  ];

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
