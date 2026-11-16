require("dotenv").config();

const {
  chain: { getApi, setSpecHeights, subscribeFinalizedHeight },
} = require("@osn/scan-common");
const { handleBlock } = require("./scan/block");
const { fetchBlock } = require("./scan/common");
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

  let blockHeights = [776108];

  const db = await getIdentityDb();
  const api = await getApi();
  let toScanHeight = await db.getNextScanHeight();
  await deleteFrom(toScanHeight);

  for (const height of blockHeights) {
    await setSpecHeights([height - 1]);

    const blockHash = await api.rpc.chain.getBlockHash(height);
    const blockApi = await api.at(blockHash);
    const block = await fetchBlock(api, blockApi, blockHash);
    const allEvents = await blockApi.query.system.events();

    await handleBlock({
      height,
      block,
      events: allEvents,
    });
    console.log(`${height} finished`);
  }

  console.log("finished");
  process.exit(0);
}

main().then(console.log);
