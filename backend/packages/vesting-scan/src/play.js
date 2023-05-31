require("dotenv").config();

const {
  chain: { getApi, setSpecHeights, subscribeFinalizedHeight },
} = require("@osn/scan-common");
const { handleBlock } = require("./scan/block");
const {
  vesting: { initVestingScanDb },
} = require("@statescan/mongo");

async function main() {
  await initVestingScanDb();
  await subscribeFinalizedHeight();
  const blockHeights = [
    8730807, // merge schedules
    15701277, // vest
    15630362, // vest other,
    15562357, // vest transfer,
    15604996, // force vested transfer,
    15551258, // two completed vesting
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
}

main().then(console.log);
