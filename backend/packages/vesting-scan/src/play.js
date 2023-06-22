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
    16675360, // transfer to JEWRHBymADy77q5SCt2pBTtb7qhcdrCF6E8DtU7F99pjwkC
    16675389,
    16675437, // vesting completed
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
