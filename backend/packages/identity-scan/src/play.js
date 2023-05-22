require("dotenv").config();
const {
  chain: { getApi, setSpecHeights, subscribeFinalizedHeight },
} = require("@osn/scan-common");
const { handleBlock } = require("./scan/block");
const {
  identity: { initIdentityScanDb, dropIdentityCollectionAndInit },
} = require("@statescan/mongo");
const { deleteFrom } = require("./scan/delete");
const {
  identity: { getIdentityTimelineCollection },
} = require("@statescan/mongo");
const {
  identity: { getIdentityDb },
} = require("@statescan/mongo");
const { getAllRegistrars } = require("./scan/jobs");

async function main() {
  await initIdentityScanDb();
  await subscribeFinalizedHeight();

  // blockHeights for collection registarsTimeline, identity, subIdentity, identityTimeline events

  const registrarTimelineEvents = [
    17935411,
    17877876, //registrarTimeline
  ];
  const identityEvents = [
    17914288,
    17884357, //identity
  ];

  const identityAddAndRemoveEvents = [
    6884575, //add identity
    17878291, //remove identity
  ]; // should add and remove accountID G7iL4n1wmubEyojuD3ATarFRhJMFEYbNuCYJeATnFkbgekK

  const subIdentityAddRemoveEvents = [
    17664915, //add subIdentity
    17664910, //remove subIdentity
  ]; // should add and remove accountID DAm6jqp5N4kYRbSQeRVebLGnZS3vsbXg6BrUkfW718Qow72

  const subIdentityAddEvents = [15091877, 14576724];
  const identityTimelineEvents = [
    10957429, 10957452, 17664901, 17664907, 17664915, 17664910,
  ];
  let blockHeights = [
    ...identityTimelineEvents,
    ...identityEvents,
    ...subIdentityAddRemoveEvents,
    ...registrarTimelineEvents,
    ...identityAddAndRemoveEvents,
    ...subIdentityAddEvents,
  ];
  await dropIdentityCollectionAndInit();
  const db = await getIdentityDb();
  const api = await getApi();
  let toScanHeight = await db.getNextScanHeight();
  await deleteFrom(toScanHeight);
  await getAllRegistrars(api);

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
