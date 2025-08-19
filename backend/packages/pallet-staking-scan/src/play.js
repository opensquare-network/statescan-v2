require("dotenv").config();

const {
  chain: { getApi, setSpecHeights, subscribeFinalizedHeight },
} = require("@osn/scan-common");
const { handleBlock } = require("./scan");
const {
  palletStaking: { initPalletStakingScanDb },
} = require("@statescan/mongo");

(async () => {
  await initPalletStakingScanDb();
  await subscribeFinalizedHeight();

  const blockHeights = [
    6799920,
    // 1379482,
    // 334618,
    // 6713103,
    // 26728381,
  ];

  const api = await getApi();
  for (const height of blockHeights) {
    await setSpecHeights([height - 1]);

    const blockHash = await api.rpc.chain.getBlockHash(height);
    const block = await api.rpc.chain.getBlock(blockHash);
    const allEvents = await api.query.system.events.at(blockHash);

    await handleBlock(
      {
        height,
        block: block.block,
        events: allEvents,
      },
      false,
    );
    console.log(`${height} finished`);
  }

  console.log("finished");
  process.exit(0);
})();
