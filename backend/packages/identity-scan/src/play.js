require("dotenv").config();

const {
  chain: { getApi, setSpecHeights, subscribeFinalizedHeight },
} = require("@osn/scan-common");
const { handleBlock } = require("./scan/block");
const {
  identity: { initIdentityScanDb },
} = require("@statescan/mongo");
const { deleteFrom } = require("./scan/delete");
const {
  identity: { getIdentityDb },
} = require("@statescan/mongo");

async function main() {
  await initIdentityScanDb();
  await subscribeFinalizedHeight();

  let blockHeights = [610633];

  const db = await getIdentityDb();
  const api = await getApi();
  let toScanHeight = await db.getNextScanHeight();
  await deleteFrom(toScanHeight);

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
